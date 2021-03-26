export function renderLoading(element, state) {
    const button = element.querySelector(".popup__submit-button")
    if (state == 'on') {button.value = 'Сохранение...'}
    else if (state == 'reset') {button.value = 'Сохранить'}
};

export function returnResult(res) {
    if (res.ok) {return res.json()}
    return Promise.reject(new Error(`Статус не ОК (${res.status})`))
};