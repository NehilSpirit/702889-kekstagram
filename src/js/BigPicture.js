import AbstarctView from './AbstractView';
// импортируем шаблон
import { bigPictureTemplate } from './templates';


export default class BigPicture extends AbstarctView {
  constructor(data) {
    if (!data) {
      throw new Error('ошибка создания BigPicture, отсутсвуют входные данные');
    }
    // инициализируем родительский класс (отрабтаем конструктор) с параметрами
    super(bigPictureTemplate, data);
    this.rendered = this.render();
  }
}
