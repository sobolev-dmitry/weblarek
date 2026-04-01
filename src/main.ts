import './scss/styles.scss';
import { Catalog } from './components/models/Catalog';
import { Basket } from './components/models/Basket';
import { Order } from './components/models/Order';
import { apiProducts } from './utils/data';
import { ShopApi } from './components/models/ShopApi';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';

console.log('=== ТЕСТИРОВАНИЕ МОДЕЛЕЙ ДАННЫХ ===\n');

// 1. Тестирование класса Catalog
console.log('1. ТЕСТИРОВАНИЕ CATALOG:');
const catalog = new Catalog();

console.log('  - Сохраняем товары из apiProducts.items в каталог...');
catalog.setItems(apiProducts.items);

console.log('  - Получаем массив всех товаров из каталога:');
console.log('    Всего товаров:', catalog.items.length);
console.log('    ', catalog.items);

console.log('  - Ищем товар с ID "854cef69-976d-4c2a-a18c-2aa45046c390":');
const hourProduct = catalog.getProduct('854cef69-976d-4c2a-a18c-2aa45046c390');
console.log('    Найден:', hourProduct ? 'Да' : 'Нет');
if (hourProduct) {
  console.log('    Название:', hourProduct.title);
  console.log('    Цена:', hourProduct.price ?? 'Не указана');
}

console.log('  - Устанавливаем товар "HEX-леденец" для предпросмотра...');
const hexLollipop = catalog.getProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');
if (hexLollipop) {
  catalog.preview = hexLollipop;
}

console.log('  - Получаем текущий товар для предпросмотра:');
console.log('    ', catalog.preview);
console.log('');

// 2. Тестирование класса Basket
console.log('2. ТЕСТИРОВАНИЕ BASKET:');
const basket = new Basket();

const timerProduct = catalog.getProduct('b06cde61-912f-4663-9751-09956c0eed67'); // Мамка-таймер (price: null)
const frameworkProduct = catalog.getProduct('412bcf81-7e75-4e70-bdb9-d3c73c9803b7'); // Фреймворк куки судьбы

if (hourProduct) {
  console.log('  - Добавляем "+1 час в сутках" в корзину...');
  const addedHour = basket.add(hourProduct);
  console.log('    Результат добавления:', addedHour ? 'Успешно' : 'Ошибка');
}

if (timerProduct) {
  console.log('  - Пытаемся добавить "Мамка-таймер" (цена null) в корзину...');
  const addedTimer = basket.add(timerProduct);
  console.log('    Результат добавления:', addedTimer ? 'Успешно' : 'Товар не добавлен (цена null)');
}

if (frameworkProduct) {
  console.log('  - Добавляем "Фреймворк куки судьбы" в корзину...');
  const addedFramework = basket.add(frameworkProduct);
  console.log('    Результат добавления:', addedFramework ? 'Успешно' : 'Ошибка');
}

console.log('  - Текущие товары в корзине:');
console.log('    Количество:', basket.getCount());
console.log('    ', basket.getItems());

console.log('  - Общая стоимость товаров в корзине:');
console.log('    ', basket.getTotal(), 'синапсов');

console.log('  - Проверяем наличие товара "+1 час в сутках":');
console.log('    ', basket.hasItem('854cef69-976d-4c2a-a18c-2aa45046c390')
  ? 'Есть в корзине'
  : 'Нет в корзине');

console.log('  - Удаляем товар "Фреймворк куки судьбы"...');
basket.remove('412bcf81-7e75-4e70-bdb9-d3c73c9803b7');


console.log('  - Товары в корзине после удаления:');
console.log('    Количество после удаления:', basket.getCount());
console.log('    ', basket.getItems());
console.log('');

// 3. Тестирование класса Order
console.log('3. ТЕСТИРОВАНИЕ ORDER:');
const order = new Order();

console.log('  - Устанавливаем данные покупателя...');
order.setField('address', 'г. Москва, ул. Веб-разработчиков, д. 1');
order.setField('email', 'webdev@example.com');
order.setField('phone', '+7 (999) 999-99-99');
order.setField('payment', 'card');


console.log('  - Получаем текущие данные заказа:');
console.log('    ', order.getOrderData());


console.log('  - Валидируем заказ:');
const validationErrors = order.validateOrder();
if (Object.keys(validationErrors).length === 0) {
  console.log('    Ошибок валидации нет — заказ корректен');
} else {
  console.log('    Ошибки валидации:', validationErrors);
}

// Тестируем валидацию с неполными данными
console.log('  - Очищаем email и тестируем валидацию снова...');
order.setField('email', '');
const validationWithErrors = order.validateOrder();
console.log('    Ошибки при пустом email:', validationWithErrors);

console.log('  - Очищаем заказ...');
order.clearOrder();

console.log('  - Данные заказа после очистки:');
console.log('    ', order.getOrderData());
console.log('');

console.log('\n=== ПОДКЛЮЧЕНИЕ К СЕРВЕРУ И ЗАГРУЗКА ТОВАРОВ ===');

// Создаём экземпляр API с использованием константы API_URL
const apiInstance = new Api(API_URL);
const shopApi = new ShopApi(apiInstance);

console.log('1. ЗАПРОС ТОВАРОВ С СЕРВЕРА...');
shopApi.getLotList()
  .then(products => {
    console.log(`  - Успешно получено ${products.length} товаров с сервера`);

    // Очищаем предыдущий тестовый каталог (заполненный из apiProducts)
    catalog.setItems([]);

    // Сохраняем товары, полученные с сервера, в модель каталога
    catalog.setItems(products);

    // Выводим сохранённый каталог в консоль для проверки
    console.log('  - Каталог обновлён данными с сервера:');
    console.log('    Всего товаров в каталоге:', catalog.items.length);

    // Показываем первые 3 товара для наглядности
    console.log('    Первые 3 товара:');
    catalog.items.slice(0, 3).forEach(product => {
      console.log(`      - ${product.title} (ID: ${product.id}, цена: ${product.price ?? 'бесценен'})`);
    });

    // Дополнительно проверяем, что товары с ценой null не добавляются в корзину
    console.log('\n  - Проверка добавления товаров с ценой null:');
    const pricelessProduct = catalog.getProduct('b06cde61-912f-4663-9751-09956c0eed67'); // Мамка-таймер
    if (pricelessProduct) {
      const addResult = basket.add(pricelessProduct);
      console.log(`    Попытка добавить "Мамка-таймер": ${addResult ? 'Успешно' : 'Не добавлен (цена null)'}`);
    }
  })
  .catch(error => {
    console.error('  - Ошибка при получении товаров с сервера:', error);
    console.warn('  - Продолжаем работу с тестовыми данными из apiProducts');
  });

console.log('\n=== ВСЕ ТЕСТЫ И ПРОВЕРКИ ЗАВЕРШЕНЫ ===');