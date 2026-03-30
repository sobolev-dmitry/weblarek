import { IBuyer, ValidationErr } from '../../types';

export class Order {
  private order: IBuyer = {
    payment: 'card',
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
    if (!this.order.email.trim() || !this.isValidEmail(this.order.email)) {
      errors.email = 'Введите корректный адрес электронной почты';
    }
    if (!this.order.phone.trim()) {
      errors.phone = 'Номер телефона обязателен для заполнения';
    }

    return errors;
  }

  getOrderData(): IBuyer {
    return { ...this.order }; // Возвращаем копию данных заказа
  }

  clearOrder(): void {
    this.order = {
      payment: 'card',
      address: '',
      email: '',
      phone: ''
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
