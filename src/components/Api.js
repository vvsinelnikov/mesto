export default class Api {
  constructor(apiSettings) {
    this._baseUrl = apiSettings.baseUrl;
    this._headers = apiSettings.headers
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {return res.json()}
        return Promise.reject(new Error(`Статус не ОК (${res.status})`))
        })
      .catch(err => console.log('api.getInitialCards: ' + err))
  }

  getMyInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {return res.json()}
        return Promise.reject(new Error(`Статус не ОК (${res.status})`))
        })
      .catch(err => console.log('api.getMyInfo: ' + err))
  }

  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(res => {
        if (res.ok) {return res.json()}
        return Promise.reject(new Error(`Статус не ОК (${res.status})`))
        })
      .catch(err => console.log('api.updateAvatar: ' + err))
  }

  updateProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {return res.json()}
        return Promise.reject(new Error(`Статус не ОК (${res.status})`))
        })
      .catch(err => console.log('api.updateProfile: ' + err))
  }

  postCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then(res => {
        if (res.ok) {return res.json()}
        return Promise.reject(new Error(`Статус не ОК (${res.status})`))
        })
      .catch(err => console.log('api.postCard: ' + err))
  }

  cardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {return res.json()}
        return Promise.reject(new Error(`Статус не ОК (${res.status})`))
        })
      .catch(err => console.log('api.cardLike: ' + err))
  }

  cardDislike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {return res.json()}
        return Promise.reject(new Error(`Статус не ОК (${res.status})`))
        })
      .catch(err => console.log('api.cardDislike: ' + err))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {return res.json()}
        return Promise.reject(new Error(`Статус не ОК (${res.status})`))
        })
      .catch(err => console.log('api.deleteCard: ' + err))
  }
}