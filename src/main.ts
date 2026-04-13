import './scss/styles.scss';
import { Catalog } from './components/models/CatalogModel';
import { Basket } from './components/models/BasketModel';
import { Order } from './components/models/OrderModel';
import { ShopApi } from './components/models/ShopApi';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

console.log('=== ТЕСТИРОВАНИЕ МОДЕЛЕЙ ДАННЫХ ===\n');

// 1. Создание экземпляров всех классов
console.log('1. СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ:');
const catalog = new Catalog();
const basket = new Basket();
const order = new Order();
const apiInstance = new Api(API_URL);
const shopApi = new ShopApi(apiInstance);
console.log('  - Все экземпляры созданы успешно');

console.log('\n=== ТЕСТИРОВАНИЕ С МОКОВЫМИ ДАННЫМИ ===');

// 2. Тестирование с моковыми данными
console.log('2. ТЕСТИРОВАНИЕ МЕТОДОВ С МОКОВЫМИ ДАННЫМИ:');
catalog.setItems(apiProducts.items);
console.log('  - Загружены товары:', apiProducts.items);

// Тестирование Catalog
console.log('\n  - Тестирование Catalog:');

// Получаем ID первого товара через геттер items
const firstItemId = catalog.items[0]?.id;
if (firstItemId) {
  const testProduct = catalog.getProduct(firstItemId);
  console.log('    - Полученный продукт по id:', testProduct);
} else {
  console.log('    - В каталоге нет товаров для тестирования getProduct');
}

// Проверка метода preview — используем второй товар из каталога
if (catalog.items[1]) {
  catalog.preview = catalog.items[1];
  console.log('    - Текущий preview:', catalog.preview);
} else {
  console.log('    - В каталоге недостаточно товаров для тестирования preview');
}

// Тестирование Basket
console.log('\n  - Тестирование Basket:');

// Добавляем товары в корзину только если они существуют в каталоге
if (catalog.items[1] && catalog.items[3]) {
  basket.add(catalog.items[1]);
  basket.add(catalog.items[3]);
  console.log('    - Товары добавлены в корзину');
  console.log('    - Количество товаров в корзине:', basket.getCount());
  console.log('    - Общая сумма:', basket.getTotal(), 'синапсов');
  console.log('    - Список товаров в корзине:', basket.getItems());

  // Проверка удаления товара
  basket.remove(catalog.items[1].id);
  console.log('    - Товар удалён из корзины');
  console.log('    - Список продуктов после удаления товара:', basket.getItems());
  console.log('    - Количество после удаления:', basket.getCount());
} else {
  console.log('    - В каталоге недостаточно товаров для тестирования корзины');
}

// Проверка очистки корзины
basket.clear();
console.log('    - Корзина очищена');
console.log('    - Список после очистки:', basket.getItems());
console.log('    - Количество после очистки:', basket.getCount());

// Тестирование Order
console.log('\n  - Тестирование Order:');
order.setField('address', 'ул. Тестеровщиков, 1');
order.setField('email', 'test@example.com');
order.setField('phone', '+7 (999) 123-45-67');
order.setField('payment', 'card');

const errors = order.validateOrder();
console.log('    - Результат валидации:', errors);
console.log('    - Данные заказа:', order.getOrderData());

// Проверка очистки модели Order
order.clearOrder();
console.log('    - Модель заказа очищена');
console.log('    - Данные после очистки:', order.getOrderData());

console.log('\n=== ПРОВЕРКА ПОЛУЧЕНИЯ ТОВАРОВ С СЕРВЕРА ===');

// 3. Проверка получения товаров с сервера (только получение, без тестов)
console.log('3. ЗАПРОС ТОВАРОВ С СЕРВЕРА...');
shopApi.getLotList()
  .then(products => {
    console.log(`  - Успешно получено ${products.length} товаров с сервера`);
    console.log('  - Полный массив товаров:', products);
  })
  .catch(error => {
    // Обработка ошибок — только сообщение об ошибке
    console.error('  - Ошибка при получении товаров с сервера:', error);
    console.warn('  - Не удалось получить данные с сервера');
  });

console.log('\n=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
