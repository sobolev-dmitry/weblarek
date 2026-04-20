import { Component } from '../base/Component';
import { IEvents } from '../base/Events';


interface IFormState {
  valid: boolean;
  errors: string;
}

export class Form<T> extends Component<IFormState> {
  protected _submit: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(
    protected container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container);

    // Инициализируем элементы формы
    this._submit = container.querySelector('button[type="submit"]')!;
    this._errors = container.querySelector('.form__errors')!;

    // Подписываемся на события формы
    this.container.addEventListener('input', this.handleInput.bind(this));
    this.container.addEventListener('submit', this.handleSubmit.bind(this));
  }

  /**
   * Обрабатывает ввод данных в поля формы и уведомляет систему об изменениях
   * @param e Событие ввода данных
   */
  private handleInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    const field = target.name as keyof T;
    const value = target.value;
    this.onInputChange(field, value);
  }

  /**
   * Обрабатывает отправку формы — предотвращает стандартное поведение и эмиттит событие
   * @param e Событие отправки формы
   */
  private handleSubmit(e: Event): void {
    e.preventDefault();
    this.events.emit(`${this.container.name}:submit`);
  }

  /**
   * Уведомляет систему об изменении значения в поле формы
   * @param field Имя поля, которое изменилось
   * @param value Новое значение поля
   */
  protected onInputChange(field: keyof T, value: string): void {
    this.events.emit(`${this.container.name}.${String(field)}:change`, {
      field,
      value,
    });
  }

  /**
   * Активирует/деактивирует кнопку отправки в зависимости от валидности формы
   * @param value Флаг валидности формы (true — валидна, false — невалидна)
   */
  set valid(value: boolean) {
    this.setDisabled(this._submit, !value);
  }

  /**
   * Отображает сообщения об ошибках в соответствующем блоке формы
   * @param value Текст ошибок для отображения
   */
  set errors(value: string) {
    this.setText(this._errors, value);
  }

  /**
   * Рендерит форму с переданным состоянием, включая валидность, ошибки и значения полей
   * @param state Состояние формы, включающее валидность, ошибки и значения полей
   * @returns Контейнер формы
   */
  render(state: Partial<T> & IFormState): HTMLElement {
    const { valid, errors, ...inputs } = state;
    super.render({ valid, errors });
    Object.assign(this, inputs);
    return this.container;
  }
}
