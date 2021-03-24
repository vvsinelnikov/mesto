export default class urlValidator {
  // constructor() {
  // }

  checkElement(element) {
    return new Promise(function (resolve, reject) {
      const image = new Image();
      image.src = element.link;
      image.onload = () => {
        resolve(element)
      };
      image.onerror = () => {
        reject('Файл не найден')
      };
    })
  }

}