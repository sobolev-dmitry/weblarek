import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

interface ISuccess {
  total: number;
}

interface ISuccessActions {
  /**
   * Обработчик закрытия модального окна успеха
   */
  onClick: () => void;
}

export class Success extends Component<ISuccess> {
  /** Кнопка закрытия окна успеха */
  protected _close: HTMLElement;
  /** Элемент для отображения итоговой суммы */
  protected _total: HTMLElement;

  /**
   * Создаёт компонент Success
   * @param container Контейнер компонента
   * @param actions Действия, доступные в компоненте
   */
  constructor(container: HTMLElement, actions: ISuccessActions) {
    super(container);
    this._close = ensureElement<HTMLElement>('.order-success__close', container);
    this._total = ensureElement<HTMLElement>('.order-success__description', container);

    if (actions.onClick) {
      this._close.addEventListener('click', actions.onClick);
    }
  }

  /**
   * Устанавливает итоговую сумму в интерфейсе
   * @param value Сумма в синапсах
   */
  set total(value: number) {
    this.setText(this._total, `Списано ${value} синапсов`);
  }
}
