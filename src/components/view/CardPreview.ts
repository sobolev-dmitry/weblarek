import { ICardActions } from '../view/Card';
import { CardCatalog } from '../view/CardCatalog';
import { ensureElement } from '../../utils/utils';

/**
 * Компонент предпросмотра карточки товара с описанием и кнопкой действия
 */
export class CardPreview extends CardCatalog {
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container, actions);

    // Инициализируем ключевые элементы карточки: описание и кнопку
    this._description = ensureElement<HTMLElement>('.card__text', container);
    this._button = ensureElement<HTMLButtonElement>('.card__button', container);
  }

  /**
   * Устанавливает описание товара в карточке
   * @param value Текст описания товара. При пустой строке элемент очищается
   */
  set description(value: string) {
    this.setText(this._description, value);
  }

  /**
   * Обновляет текст на кнопке действия карточки
   * @param value Новый текст для кнопки. При пустой строке текст кнопки очищается
   */
  set button(value: string) {
    this.setText(this._button, value);
  }

  /**
   * Устанавливает цену товара и автоматически настраивает состояние кнопки:
   * - если цена недоступна (null): кнопка становится неактивной, текст меняется на «Недоступно»
   * - если цена указана: кнопка активна, текст остаётся без изменений
   *
   * @param value Цена товара или null, если товар недоступен для покупки
   */
  set price(value: number | null) {
    // Сначала передаём цену в родительский класс для базовой обработки
    super.price = value;

    if (value === null) {
      this.setText(this._button, 'Недоступно');
      this.setDisabled(this._button, true);
    } else {
      // При наличии цены просто активируем кнопку, не меняя текст
      this.setDisabled(this._button, false);
    }
  }
}
