import { IApi, IProduct, IOrder, IOrderResult, IProductList } from '../../types';
import { IEvents } from '../base/Events';

export class ShopApi {
  private api: IApi;
  protected events: IEvents;
  readonly cdn: string;

  constructor(api: IApi, events: IEvents, cdn: string) {
    this.api = api;
    this.events = events;
    this.cdn = cdn;
  }

  async getLotList(): Promise<IProduct[]> {
    try {
      this.events.emit('api:request:start', {
        method: 'getLotList',
        endpoint: '/product/'
      });

      const response: IProductList = await this.api.get('/product/');

      const productsWithImages: IProduct[] = response.items.map((item) => ({
        ...item,
        image: this.cdn + item.image
      }));

      this.events.emit('api:request:success', {
        method: 'getLotList',
        data: productsWithImages
      });

      return productsWithImages;
    } catch (error) {
      this.events.emit('api:request:error', {
        method: 'getLotList',
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  async orderLots(order: IOrder): Promise<IOrderResult> {
    try {
      this.events.emit('api:request:start', {
        method: 'orderLots',
        endpoint: '/order/',
        payload: order
      });

      const result: IOrderResult = await this.api.post('/order/', order);

      this.events.emit('api:request:success', {
        method: 'orderLots',
        data: result
      });

      return result;
    } catch (error) {
      this.events.emit('api:request:error', {
        method: 'orderLots',
        error: error instanceof Error ? error.message : String(error),
        payload: order
      });
      throw error;
    }
  }
}
