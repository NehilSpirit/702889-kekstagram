
import AbstarctView from './AbstractView';
import { infoForBigPictuteTemplate } from './templates';


export default class InfoBigPicture extends AbstarctView {
  constructor(data) {
    if (!data) {
      throw new Error('ошибка создания BigPicture, отсутсвуют входные данные');
    }
    // инициализируем родительский класс (отрабтаем конструктор) с параметрами
    super(infoForBigPictuteTemplate, data);
    this.rendered = this.render();
  }
}
