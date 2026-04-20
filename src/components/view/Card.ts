import { IProduct } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';


export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class Card<T = {}> extends Component<IProduct & T> {
  protected _title: HTMLElement;    // Заголовок товара (.card__title)
  protected _price: HTMLElement;   // Цена товара (.card__price)
  protected _button?: HTMLButtonElement | null; // Кнопка действия (.card__button)

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    // Инициализируем основные элементы карточки
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._button = container.querySelector('.card__button');

    // Настраиваем обработчик клика (на кнопку или контейнер)
    if (actions?.onClick) {
      const handler = actions.onClick;
      (this._button || this.container).addEventListener('click', handler);
    }
  }

  /** Устанавливает название товара */
  set title(value: string) {
    this.setText(this._title, value);
  }

  /** Устанавливает цену: число + «синапсов» или «Бесценно» */
  set price(value: number | null) {
    this.setText(this._price, value !== null ? `${value} синапсов` : 'Бесценно');
  }

  /** Возвращает ID товара */
  get id(): string {
    return this.container.dataset.id || '';
  }

  /** Сохраняет ID товара */
  set id(value: string) {
    this.container.dataset.id = value;
  }
}
