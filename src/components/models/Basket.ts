import { IProduct } from '../../types';

export class Basket {
  private items: IProduct[] = [];

  add(item: IProduct): void {
    // Проверяем, что товара ещё нет в корзине
    if (!this.hasItem(item.id)) {
      this.items.push({ ...item }); // Добавляем копию объекта товара
    }
  }

  remove(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  clear(): void {
    this.items = [];
  }

  getItems(): IProduct[] {
    return [...this.items]; // Возвращаем копию массива товаров
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  getCount(): number {
    return this.items.length;
  }

  hasItem(id: string): boolean {
    return this.items.some(item => item.id === id);
  }
}