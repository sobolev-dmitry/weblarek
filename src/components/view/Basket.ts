import { createElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

interface IBasketView {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasketView> {
  private readonly selectors = {
    list: '.basket__list',
    total: '.basket__price',
    button: '.basket__button'
  };

  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    // Инициализируем элементы корзины по селекторам
    this._list = container.querySelector(this.selectors.list)!;
    this._total = container.querySelector(this.selectors.total)!;
    this._button = container.querySelector(this.selectors.button)!;

    // Настраиваем обработчик клика для открытия формы заказа
    this._button.addEventListener('click', () => {
      this.events.emit('order:open');
    });

    this.items = [];
  }

  /** Обновляет перечень карточек товаров в корзине. При пустой корзине кнопка оформления заказа деактивируется */
  set items(items: HTMLElement[]) {
    if (items.length > 0) {
      this._list.replaceChildren(...items);
      this.setDisabled(this._button, false);
    } else {
      this._list.replaceChildren(
        createElement('p', {
          textContent: 'Корзина пуста',
        }),
      );
      this.setDisabled(this._button, true);
    }
  }

  /** Отображает итоговую сумму заказа */
  set total(total: number) {
    this.setText(this._total, `${total} синапсов`);
  }
}
