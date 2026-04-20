import { ensureElement } from '../../utils/utils';
import { Card, ICardActions } from '../view/Card';

export class CardBasket extends Card<{ index: string }> {
  private readonly indexSelector = '.basket__item-index';
  protected _index: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container, actions);
    this._index = ensureElement<HTMLElement>(this.indexSelector, container);
  }

  /**
   * Устанавливает номер позиции товара в списке корзины
   * @param value Порядковый номер товара (строка)
   */
  set index(value: string) {
    this.setText(this._index, value);
  }
}
