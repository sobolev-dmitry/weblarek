import { IBuyer, ValidationErr } from '../../types';
import { IEvents } from '../base/Events';

export class OrderModel {
  private order: IBuyer = {
    payment: '',
    address: '',
    email: '',
    phone: ''
  };

  constructor(protected events: IEvents) {}

  setField(field: keyof IBuyer, value: string): void {
    (this.order[field] as string) = value;
    const errors = this.validateOrder();
    this.events.emit('validationErr:change', errors);
  }

  validateOrder(): ValidationErr {
    const errors: ValidationErr = {};

    if (!this.order.address.trim()) {
      errors.address = 'Необходимо указать адрес';
    }
    if (!this.order.email.trim()) {
      errors.email = 'Необходимо указать адрес электронной почты';
    }
    if (!this.order.phone.trim()) {
      errors.phone = 'Необходимо указать номер телефона';
    }
    if (!this.order.payment.trim()) {
      errors.payment = 'Необходимо выбрать способ оплаты';
    }

    return errors;
  }

  getOrderData(): IBuyer {
    return { ...this.order };
  }

  clearOrder(): void {
    this.order = {
      payment: '',
      address: '',
      email: '',
      phone: ''
    };
    this.events.emit('validationErr:change', {});
  }
}