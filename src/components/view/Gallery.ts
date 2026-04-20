import { Component } from '../base/Component';

interface IGallery {
  items: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  constructor(protected container: HTMLElement) {
    super(container);
    // Инициализируем галерею
    this.initialize();
  }

  /**
   * Выполняет начальную настройку компонента галереи
   */
  private initialize(): void {
    // На данном этапе дополнительная инициализация не требуется,
    // но метод зарезервирован для возможного расширения функционала
  }

  /**
   * Обновляет содержимое галереи, заменяя все текущие элементы на новые
   * @param items Массив HTML‑элементов для отображения в галерее
   */
  set items(items: HTMLElement[]) {
    this.container.replaceChildren(...items);
  }
}
