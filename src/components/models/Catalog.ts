import { IProduct } from '../../types';

export class Catalog {
  private _items: IProduct[] = [];
  private _preview: IProduct | null = null;

  setItems(items: IProduct[]): void {
    this._items = [...items]; // Создаём копию массива для предотвращения внешних изменений
  }

  get items(): IProduct[] {
    return [...this._items]; // Возвращаем копию массива
  }

  getProduct(id: string): IProduct | undefined {
    return this._items.find(item => item.id === id);
  }

  set preview(item: IProduct | null) {
    this._preview = item ? { ...item } : null; // Создаём копию объекта
  }

  get preview(): IProduct | null {
    return this._preview ? { ...this._preview } : null; // Возвращаем копию объекта
  }
}
