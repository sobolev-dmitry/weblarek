import { IEvents } from '../base/Events';
import { Form } from '../view/Form';

interface IOrderForm {
  address: string;
  payment: string;
}

export class Order extends Form<IOrderForm> {
  private readonly paymentButtons: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    this.paymentButtons = this.collectPaymentButtons();
    this.setupPaymentHandlers();
  }

  /**
   * Собирает все кнопки выбора способа оплаты из контейнера формы
   * @returns Массив кнопок способа оплаты
   */
  private collectPaymentButtons(): HTMLButtonElement[] {
    return Array.from(this.container.querySelectorAll('.button_alt'));
  }

  /**
   * Настраивает обработчики кликов для кнопок способа оплаты
   * При клике передаёт название способа оплаты в систему событий
   */
  private setupPaymentHandlers(): void {
    this.paymentButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.onInputChange('payment', button.name);
      });
    });
  }

  /**
   * Устанавливает выбранный способ оплаты и обновляет визуальное состояние кнопок
   * Выделяет активную кнопку и снимает выделение с остальных
   * @param method Название способа оплаты (должно соответствовать name кнопки)
   */
  set payment(method: string) {
    this.paymentButtons.forEach(button => {
      this.toggleClass(button, 'button_alt-active', button.name === method);
    });
  }

  /**
   * Устанавливает значение адреса доставки в поле формы
   * @param value Строка с адресом для установки в поле ввода
   */
  set address(value: string) {
    const addressField = this.container.elements.namedItem('address');
    if (addressField instanceof HTMLInputElement) {
      addressField.value = value;
    }
  }
}
