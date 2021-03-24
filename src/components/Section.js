export default class Section {
    constructor (selector) {
        // this._items = items;
        // this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    // renderElement отвечает за отрисовку всех элементов
    // renderElements() {
    //     this._items.forEach((item) => {
    //         this._renderer(item);
    //     });
    // }

    // addItem принимает DOM-элемент и добавляет его в контейнер.
    addItem(element) {
        this._container.prepend(element);
    }
};