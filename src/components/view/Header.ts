import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

interface IHeader {
  counter: number;
}

export class Header extends Component<IHeader> {
  protected _counter: HTMLElement;
  protected _basket: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    // Инициализируем элементы заголовка: счётчик и корзину
    this._counter = container.querySelector('.header__basket-counter')!;
    this._basket = container.querySelector('.header__basket')!;

    // Настраиваем обработчик клика для открытия корзины
    this.setupBasketClickHandler();
  }

  /**
   * Подписывает обработчик клика на элемент корзины
   */
  private setupBasketClickHandler(): void {
    this._basket.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  /**
   * Обновляет отображение количества товаров в корзине
   * @param value Числовое значение для отображения в счётчике
   */
  set counter(value: number) {
    this.setText(this._counter, String(value));
  }
}
