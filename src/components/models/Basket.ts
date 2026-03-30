import { IProduct } from '../../types';

export class Basket {
  private items: IProduct[] = [];

  add(item: IProduct): boolean {
    // Проверяем, что товара ещё нет в корзине и у него есть цена
    if (!this.hasItem(item.id) && item.price !== null) {
      this.items.push({ ...item });
      return true; // Успешно добавлен
    }
    return false; // Не добавлен (уже есть или нет цены)
  }

  remove(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  clear(): void {
    this.items = [];
  }

  getItems(): IProduct[] {
    return [...this.items];
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
