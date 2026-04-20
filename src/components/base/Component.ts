/**
 * Базовый компонент
 */
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Учитывайте что код в конструкторе исполняется ДО всех объявлений в дочернем классе
    }

    // Инструментарий для работы с DOM в дочерних компонентах

    // Установить изображение с альтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }

    /**
     * Переключить CSS-класс у элемента
     * @param element Элемент, у которого нужно переключить класс
     * @param className Имя класса для переключения
     * @param force Принудительное состояние (true — добавить, false — удалить)
     */
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
        element.classList.toggle(className, force);
    }

    /**
     * Установить текстовое содержимое элемента
     * @param element Элемент для установки текста
     * @param value Значение, которое нужно установить (будет преобразовано в строку)
     */
    protected setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }

    /**
     * Установить состояние disabled у элемента
     * @param element Элемент формы (кнопка, поле ввода и т. д.)
     * @param state Состояние: true — отключить, false — включить
     */
    setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) {
                element.setAttribute('disabled', 'disabled');
            } else {
                element.removeAttribute('disabled');
            }
        }
    }
}
