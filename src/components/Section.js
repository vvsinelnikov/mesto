export default class Section {
    constructor (cardsContainerSelector, renderer) {
        this._renderer = renderer;
        this._cardsContainer = document.querySelector(cardsContainerSelector);
    }

    renderElements(items) {
        items.forEach((item) => this._renderer(item));
    }

    addItem(element) {
        this._cardsContainer.prepend(element);
    }
};