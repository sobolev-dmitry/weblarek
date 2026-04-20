import { IEvents } from '../base/Events';
import { Form } from '../view/Form';

interface IContactsForm {
  email: string;
  phone: string;
}

export class Contacts extends Form<IContactsForm> {
  private _emailInput: HTMLInputElement;
  private _phoneInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    // Инициализируем ссылки на поля формы
    this._emailInput = this.container.elements.namedItem('email') as HTMLInputElement;
    this._phoneInput = this.container.elements.namedItem('phone') as HTMLInputElement;
  }

  /**
   * Устанавливает значение для поля email
   * @param value Строка с email‑адресом для установки в поле ввода
   */
  set email(value: string) {
    this._emailInput.value = value;
  }

  /**
   * Устанавливает значение для поля phone
   * @param value Строка с номером телефона для установки в поле ввода
   */
  set phone(value: string) {
    this._phoneInput.value = value;
  }
}
