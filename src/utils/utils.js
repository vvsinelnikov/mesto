export function renderLoading(element, state) {
    const button = element.querySelector(".popup__submit-button")
    if (state == 'on') {button.value = 'Сохранение...'}
    else if (state == 'reset') {button.value = 'Сохранить'}
};

export function returnResult(res) {
    if (res.ok) {return res.json()}
    return Promise.reject(new Error(`Статус не ОК (${res.status})`))
};

export function likeCard(element,cardObj) {
    cardObj.likesCount += 1;
    element.querySelector(".card__like-button").classList.add('card__like-button_liked');
    element.querySelector(".card__like-counter").textContent = cardObj.likesCount;
    cardObj.isliked = true;
}

export function dislikeCard(element, cardObj) {
    cardObj.likesCount -= 1;
    element.querySelector(".card__like-button").classList.remove('card__like-button_liked');
    // if (res.likes.length == 0) {element.querySelector(".card__like-counter").textContent = ''}
    // else {element.querySelector(".card__like-counter").textContent = res.likes.length};
    if (cardObj.likesCount > 0) {element.querySelector(".card__like-counter").textContent = cardObj.likesCount}
    else {element.querySelector(".card__like-counter").textContent = ''};
    cardObj.isliked = false;
}