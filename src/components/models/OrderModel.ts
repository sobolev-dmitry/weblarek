import { IBuyer, ValidationErr } from '../../types';

export class Order {
  private order: IBuyer = {
    payment: '',
    address: '',
    email: '',
    phone: ''
  };

  setField(field: keyof IBuyer, value: string): void {
    (this.order[field] as string) = value;
  }

  validateOrder(): ValidationErr {
    const errors: ValidationErr = {};

    if (!this.order.address.trim()) {
      errors.address = 'Адрес доставки обязателен для заполнения';
    }
    if (!this.order.email.trim()) {
      errors.email = 'Введите корректный адрес электронной почты';
    }
    if (!this.order.phone.trim()) {
      errors.phone = 'Номер телефона обязателен для заполнения';
    }
    if (!this.order.payment.trim()) {
      errors.payment = 'Способ оплаты обязателен для выбора';
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
  }
}
