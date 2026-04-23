import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class CatalogModel {
private _items: IProduct[] = [];
private _preview: IProduct | null = null;

constructor(protected events: IEvents) {}

setItems(items: IProduct[]): void {
this._items = [...items];
this.events.emit('items:changed', this._items);
}

get items(): IProduct[] {
return [...this._items];
}

getProduct(id: string): IProduct | undefined {
return this._items.find(item => item.id === id);
}

set preview(item: IProduct) {
this._preview = { ...item };
this.events.emit('card:preview_changed', this._preview);
}

get preview(): IProduct | null {
return this._preview ? { ...this._preview } : null;
}
}