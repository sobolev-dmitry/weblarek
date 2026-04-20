import { Card, ICardActions } from '../view/Card';
import { ensureElement } from '../../utils/utils';


/**
 * Компонент карточки товара для каталога с изображением и категорией
 */
export class CardCatalog extends Card {
  protected _image: HTMLImageElement;
  protected _category: HTMLElement;

  private readonly categoryClassMap: Record<string, string> = {
    'софт-скил': 'card__category_soft',
    'хард-скил': 'card__category_hard',
    другое: 'card__category_other',
    дополнительное: 'card__category_additional',
    кнопка: 'card__category_button',
  };


  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container, actions);
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._category = ensureElement<HTMLElement>('.card__category', container);
  }

  /**
   * Устанавливает изображение для карточки товара
   * @param value URL изображения
   */
  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  /**
   * Устанавливает категорию товара и применяет соответствующий CSS‑класс
   * @param value Название категории товара
   */
  set category(value: string) {
    this.setText(this._category, value);
    this.applyCategoryStyling(value);
  }

  /**
   * Применяет CSS‑класс к элементу категории на основе её названия
   * @param category Название категории для стилизации
   */
  private applyCategoryStyling(category: string): void {
    // Убираем все существующие классы категорий
    Object.values(this.categoryClassMap).forEach(cls => {
      this.toggleClass(this._category, cls, false);
    });

    // Получаем класс для текущей категории, используем класс по умолчанию при отсутствии совпадения
    const categoryKey = category.toLowerCase();
    const cssClass = this.categoryClassMap[categoryKey] || 'card__category_other';
    
    // Применяем новый класс
    this.toggleClass(this._category, cssClass, true);
  }
}
