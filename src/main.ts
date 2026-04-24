import './scss/styles.scss';
import { CatalogModel } from './components/models/CatalogModel';
import { BasketModel } from './components/models/BasketModel';
import { OrderModel } from './components/models/OrderModel';
import { ShopApi } from './components/models/ShopApi';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { Header } from './components/view/Header';
import { Modal } from './components/view/Modal';
import { Gallery } from './components/view/Gallery';
import { Basket } from './components/view/Basket';
import { Order } from './components/view/Order';
import { Contacts } from './components/view/Contacts';
import { Success } from './components/view/Success';
import { CardCatalog } from './components/view/CardCatalog';
import { CardPreview } from './components/view/CardPreview';
import { CardBasket } from './components/view/CardBasket';
import { cloneTemplate } from './utils/utils';
import { API_URL, CDN_URL } from './utils/constants';
import { IBuyer, IProduct } from './types';

class Application {
  private events = new EventEmitter();
  private api = new ShopApi(new Api(API_URL), this.events, CDN_URL);

  // Модели
  private catalog = new CatalogModel(this.events);
  private basket = new BasketModel(this.events);
  private order = new OrderModel(this.events);

  // Представления
  private header = new Header(document.querySelector('.header')!, this.events);
  private gallery = new Gallery(document.querySelector('.gallery')!);
  private modal = new Modal(document.querySelector('#modal-container')!, this.events);

  // Шаблоны
  private cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
  private cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
  private cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
  private basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
  private orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
  private contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
  private successTemplate = document.querySelector('#success') as HTMLTemplateElement;

  // Экземпляры представлений
  private views = {
    basket: new Basket(cloneTemplate(this.basketTemplate), this.events),
    order: new Order(cloneTemplate(this.orderTemplate), this.events),
    contacts: new Contacts(cloneTemplate(this.contactsTemplate), this.events),
    success: new Success(cloneTemplate(this.successTemplate), {
      onClick: () => this.modal.close()
    })
  };

  private preview = new CardPreview(cloneTemplate(this.cardPreviewTemplate), {
    onClick: () => this.events.emit('card:add')
  });

  constructor() {
    this.setupEventListeners();
    this.loadProducts();
  }

  private setupEventListeners(): void {
    // Обновление галереи товаров
    this.events.on('items:changed', () => {
      this.gallery.items = this.catalog.items.map((item) => {
        const card = new CardCatalog(cloneTemplate(this.cardCatalogTemplate), {
          onClick: () => this.events.emit('card:select', { id: item.id })
        });
        return card.render(item);
      });
    });

    // Выбор товара — используем метод модели getProduct
    this.events.on('card:select', (data: { id: string }) => {
      const item = this.catalog.getProduct(data.id);
      if (item) {
        this.catalog.preview = item;
      }
    });

    // Показать предпросмотр товара
    this.events.on('card:preview_changed', (item: IProduct) => {
      this.modal.render({
        content: this.preview.render({
          ...item,
          button: this.basket.hasItem(item.id) ? 'Удалить из корзины' : 'Купить'
        } as object)
      });
    });

    // Добавить/удалить товар из корзины
    this.events.on('card:add', () => {
      const item = this.catalog.preview;
      if (item && item.price !== null) {
        if (this.basket.hasItem(item.id)) {
          this.basket.remove(item.id);
        } else {
          this.basket.add(item);
        }
        this.preview.render({
          ...item,
          button: this.basket.hasItem(item.id) ? 'Удалить из корзины' : 'Купить'
        } as object);
      }
    });

    // Открыть корзину
    this.events.on('basket:open', () => {
      this.modal.render({
        content: this.views.basket.render()
      });
    });

    // Обновить корзину
    this.events.on('basket:changed', () => {
      this.header.counter = this.basket.getCount();
      this.views.basket.items = this.basket.getItems().map((item, index) => {
        const card = new CardBasket(cloneTemplate(this.cardBasketTemplate), {
          onClick: () => this.events.emit('card:remove', { id: item.id })
        });
        return card.render({
          ...item,
          index: (index + 1).toString()
        });
      });
      this.views.basket.total = this.basket.getTotal();
    });

    // Удалить товар из корзины
    this.events.on('card:remove', (data: { id: string }) => {
      this.basket.remove(data.id);
    });

    
   // Открыть форму заказа
   this.events.on('order:open', () => {
    this.modal.render({
      content: this.views.order.render({
        address: '',
        payment: '',
        valid: true,
        errors: ''
      })
    });
    this.events.emit('order:changed');
    });

   // Обработка изменения данных покупателя
   this.events.on('order:changed', () => {
    const orderData = this.order.getOrderData();
    const errors = this.order.validateOrder();

    // Обновляем форму заказа
    this.views.order.address = orderData.address;
    this.views.order.payment = orderData.payment;
    this.views.order.valid = !errors.address && !errors.payment;
    this.views.order.errors = (orderData.address !== '' || orderData.payment !== '')
      ? [errors.address, errors.payment].filter(Boolean).join('; ')
      : '';

    // Обновляем форму контактов
    this.views.contacts.email = orderData.email;
    this.views.contacts.phone = orderData.phone;
    this.views.contacts.valid = !errors.email && !errors.phone;
    this.views.contacts.errors = (orderData.email !== '' || orderData.phone !== '')
      ? [errors.email, errors.phone].filter(Boolean).join('; ')
      : '';
  });

  // Изменение полей формы
  this.events.on(/^order\..*:change|^contacts\..*:change/, (data: { field: keyof IBuyer; value: string }) => {
    this.order.setField(data.field, data.value);
  });

  // Перейти к контактам
  this.events.on('order:submit', () => {
    this.modal.render({
      content: this.views.contacts.render({
        email: '',
        phone: '',
        valid: true,
        errors: ''
      })
    });
    this.events.emit('order:changed');
  });

  // Отправить заказ
  this.events.on('contacts:submit', () => {
    const orderData = {
      ...this.order.getOrderData(),
      items: this.basket.getItems().map((item) => item.id),
      total: this.basket.getTotal()
    };

    this.api
      .orderLots(orderData)
      .then((result) => {
        this.modal.render({
          content: this.views.success.render({ total: result.total })
        });
        this.basket.clear();
        this.order.clearOrder();
      })
      .catch(console.error);
  });
}

// Загрузка товаров с сервера
  private loadProducts(): void {
    this.api
      .getLotList()
      .then((items) => this.catalog.setItems(items))
      .catch(console.error);
  }
}

// Запуск приложения
new Application();
