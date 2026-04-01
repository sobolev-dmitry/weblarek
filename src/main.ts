import './scss/styles.scss';
import { Catalog } from './components/models/Catalog';
import { Basket } from './components/models/Basket';
import { Order } from './components/models/Order';
import { ShopApi } from './components/models/ShopApi';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';

console.log('=== ТЕСТИРОВАНИЕ МОДЕЛЕЙ ДАННЫХ ===\n');

// 1. Создание экземпляров всех классов
console.log('1. СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ:');
const catalog = new Catalog();
const basket = new Basket();
const order = new Order();
const apiInstance = new Api(API_URL);
const shopApi = new ShopApi(apiInstance);
console.log('  - Все экземпляры созданы успешно');

console.log('\n=== ПОДКЛЮЧЕНИЕ К СЕРВЕРУ И ЗАГРУЗКА ТОВАРОВ ===');

// 2. Запрос к серверу за каталогом
console.log('2. ЗАПРОС ТОВАРОВ С СЕРВЕРА...');
shopApi.getLotList()
  .then(products => {
    console.log(`  - Успешно получено ${products.length} товаров с сервера`);

    // 3. Сохранение массива в модели и вывод в консоль
    catalog.setItems(products);
    console.log('  - Каталог обновлён данными с сервера');
    console.log('    Всего товаров в каталоге:', catalog.items.length);
    console.log('    Полный массив товаров:', catalog.items);

    // 4. Тестирование методов моделей данных
    console.log('\n3. ТЕСТИРОВАНИЕ МЕТОДОВ МОДЕЛЕЙ:');

    // Тестирование Catalog
    const testProduct = catalog.getProduct(catalog.items[0]?.id);
    console.log('  - getProduct():', testProduct ? 'успех' : 'не найден');

    // Тестирование Basket — добавляем товары
    basket.add(catalog.items[1]);
    basket.add(catalog.items[4]);
    basket.add(catalog.items[5]);
    console.log('  - add(): товары добавлены в корзину');

    console.log('  - getCount():', basket.getCount());
    console.log('  - getTotal():', basket.getTotal(), 'синапсов');

    // Тестирование Order — с телефоном, способом оплаты и email
    order.setField('address', 'ул. Тестеровщиков, 1');
    order.setField('email', 'test@example.com');
    order.setField('phone', '+7 (999) 123-45-67');
    order.setField('payment', 'card');

    const errors = order.validateOrder();
    console.log('  - validateOrder():', Object.keys(errors).length === 0 ? 'ошибок нет' : 'есть ошибки');
    console.log('  - getOrderData():', order.getOrderData());
  })
  .catch(error => {
    // 5. Обработка ошибок
    console.error('  - Ошибка при получении товаров с сервера:', error);
    console.warn('  - Продолжаем с пустыми данными для базового тестирования моделей');

    // Базовые тесты моделей без данных с сервера
    console.log('\n  - Базовое тестирование моделей:');
    console.log('    - catalog.items.length:', catalog.items.length);
    console.log('    - basket.getCount():', basket.getCount());
    console.log('    - basket.getTotal():', basket.getTotal());

    // Базовое тестирование Order
    order.setField('address', 'ул. Тестеровщиков, 1');
    order.setField('email', 'test@example.com');
    order.setField('phone', '+7 (000) 000-00-00');
    order.setField('payment', 'cash');

    console.log('    - order.getOrderData().address:', order.getOrderData().address);
    console.log('    - order.getOrderData().email:', order.getOrderData().email);
    console.log('    - order.getOrderData().phone:', order.getOrderData().phone);
    console.log('    - order.getOrderData().payment:', order.getOrderData().payment);
  });
