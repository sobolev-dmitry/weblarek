import { Component } from '../base/Component';
import { IEvents } from '../base/Events';


interface IModalData {
  content: HTMLElement | null;
}

export class Modal extends Component<IModalData> {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    // Инициализируем элементы модального окна
    this._closeButton = container.querySelector('.modal__close') as HTMLButtonElement;
    this._content = container.querySelector('.modal__content') as HTMLElement;

    // Настраиваем обработчики событий
    this._closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', (event: MouseEvent) => {
      if (event.target === this.container) {
        this.close();
      }
    });
    this._content.addEventListener('click', (event) => event.stopPropagation());
  }

  set content(value: HTMLElement | null) {
    if (value) {
      this._content.replaceChildren(value);
    } else {
      this._content.innerHTML = '';
    }
  }

  /**
   * Открывает модальное окно и уведомляет систему о событии
   */
  open(): void {
    this.toggleClass(this.container, 'modal_active', true);
    this.events.emit('modal:open');
  }

  /**
   * Закрывает модальное окно, очищает контент и уведомляет систему о событии
   */
  close(): void {
    this.toggleClass(this.container, 'modal_active', false);
    this.content = null;
    this.events.emit('modal:close');
  }

  /**
   * Рендерит модальное окно с переданным контентом и открывает его
   * @param data Данные для отображения в модальном окне
   * @returns Контейнер модального окна
   */
  render(data: IModalData): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }
}
