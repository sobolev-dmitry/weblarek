export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: PaymentMethod;
  address: string;
  email: string;
  phone: string;
}

export type PaymentMethod = 'card' | 'cash' | '';

export interface IOrder extends IBuyer {
  total: number;
  items: string[];
}

export type ValidationErr = Partial<Record<keyof IBuyer, string>>;
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Новые типы для API
export interface IApiResponse<T> {
  total: number;
  items: T[];
}

export interface IOrderResult {
  id: string;
  total: number;
}

export type EventName = string | RegExp;

export interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

export interface IProductList {
  total: number;
  items: IProduct[];
}

export interface IOrderForm {
  payment: PaymentMethod;
  address: string;
}

export interface IContactForm {
  email: string;
  phone: string;
}

export interface IBuyer extends IOrderForm, IContactForm {}