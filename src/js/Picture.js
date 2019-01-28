import AbstarctView from './AbstractView';
// импортируем шаблон
import { pictureTemplate } from './templates';

export default class Picture extends AbstarctView {
  constructor(data) {
    // если нам нужны данные обязательно то проверим чтобы они были
    if (!data) {
      throw new Error('ошибка создания Picture, отсутсвуют входные данные');
    }
    // инициализируем родительский класс (отрабтаем конструктор) с параметрами
    super(pictureTemplate, data);
    this.rendered = this.render();
    /* перенесли в родителя
    // сохраняем для доступа
    this.data = data;
    this.template = pictureTemplate;
    // вызываем функцию которая делает предварительныю работу при создании класса
    this.rendered = this.init();
    */
  }

  // переопределение для связывания(назаначения) обрабтчиков или чего то еще, чего угодно
  bind() {
    const pic = this.rendered.content.querySelector('a');
    // если нам не нужно выводить обработку события наружу и все что нам нужно
    // для обработки события есть внутри класса
    pic.addEventListener('click', this.click.bind(this));
    // если мы будем присваивать обработчик вне класса
    pic.addEventListener('click', (e) => {
      this.clickHandler(e);
    });
  }


  // оставим пустым, определим после инициализации экзепляра
  // на месте создания экземпляра
  clickHandler(e) {}

  click(e) {
    e.preventDefault();
    console.log(this.data);
  }
}

/* // ⚠️
 * как исопльзовать
 * const picture = new Picture(ДАННЫЕ_ДЛЯ РЕНДЕРА)ж
 * // определим ели нужно обработчик для клика
 * picture.clickHandler = (e)->{
 *  console.log('click-clack');
 * }
 */
