import { IProduct } from '../../types';

export class Catalog {
  private _items: IProduct[] = [];
  private _preview: IProduct | null = null;

  setItems(items: IProduct[]): void {
    this._items = [...items];
  }

  get items(): IProduct[] {
    return [...this._items];
  }

  getProduct(id: string): IProduct | undefined {
    return this._items.find(item => item.id === id);
  }

  set preview(item: IProduct) {
    this._preview = { ...item };
  }

  get preview(): IProduct | null {
    return this._preview ? { ...this._preview } : null;
  }
}
