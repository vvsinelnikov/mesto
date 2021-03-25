export default function renderLoading(element, state) {
    const button = element.querySelector(".popup__submit-button")
    if (state == 'on') {button.value = 'Сохранение...'}
    else if (state == 'reset') {button.value = 'Сохранить'}
}

