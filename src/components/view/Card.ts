import { IProduct } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class Card<T = {}> extends Component<IProduct & T> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);

    if (actions?.onClick) {
      this.addClickHandler(container, actions.onClick);
    }
  }

  private addClickHandler(container: HTMLElement, onClick: (event: MouseEvent) => void): void {
  const button = container.querySelector('.card__button');
  const target = button || container;

  target.addEventListener('click', (event: Event) => {
    event.stopPropagation();
    onClick(event as MouseEvent);
  });
  }

  /** Устанавливает название товара */
  set title(value: string) {
    this.setText(this._title, value);
  }

  /** Устанавливает цену: число + «синапсов» или «Бесценно» */
  set price(value: number | null) {
    this.setText(this._price, value !== null ? `${value} синапсов` : 'Бесценно');
  }
}
