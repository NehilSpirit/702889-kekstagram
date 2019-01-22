// импортируем шаблон
import { pictureTemplate } from './templates';

export default class Picture {
  // ждем что при создании будут переданы данные
  constructor(data) {
    if (!data) {
      throw new Error('ошибка создания Picture, отсутсвуют входные данные');
    }

    // сохраняем для доступа
    this.data = data;
    this.template = pictureTemplate;
    // вызываем функцию которая делает предварительныю работу при создании класса
    this.rendered = this.init();
  }

  init() {
    const { template, data } = this;
    const node = document.createElement('template');
    node.innerHTML = template(data);
    const pic = node.content.querySelector('a');
    pic.addEventListener('click', this.click.bind(this));
    return node.content;
  }

  create(teg, className, className2) {
    const { template, data } = this;
    const node = document.createElement(teg);
    node.classList.add(className, className2);
    node.innerHTML = template(data);
    return node;
  }

  click(e) {
    e.preventDefault();
    console.log(this.data);
  }
}
// в функции create() три аргумета, если нужно добавить только одно имя класса,
// то к названию класса, добавляет undefinet или nuul если использовать нул 
// если пустую строку передать вообще ломается(( как быть??

// хочу функцию init() сделать чтоб только отбаботчик весила. но непонимая как работает 
// боюсь трогать, а иначе дублирует create();

// 178 строка index.html есть кнопка "big-picture__cancel  cancel"  
// перестала визуализироваться, но я ее не трогала вообще. в браузере в разметке я ее вижу
// но на изображении нет.