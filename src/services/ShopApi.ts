import { IApi, IApiResponse, IProduct, IOrder, IOrderResult } from '../types';

export class ShopApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getLotList(): Promise<IProduct[]> {
    const response: IApiResponse<IProduct> = await this.api.get('/product/');
    return response.items;
  }

  async orderLots(order: IOrder): Promise<IOrderResult> {
    return this.api.post('/order/', order);
  }
}
