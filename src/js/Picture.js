// импортируем шаблон
import { pictureTemplate } from './views';

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
    // получим сслыки в переменные
    // равносильно
    // const data = this.data;
    // const template = this.template;
    // только короче
    const { template, data } = this;

    // нам для работы в дальнейшем с HTML element-ом 
    // для навешивания событий и прочего нужно его создать
    // идем на небольшую хитрость создадим шаблон
    // и добавим в него наш ... шаблон но уже с данными
    const node = document.createElement('template');
    node.innerHTML = template(data);
    // получим ччто-то типа <template><#fragment>...тут наш шаблон...</#fragment></template>
    // поэтому нужно получить content и уже там выполнить поиск
    // и получить элемент на который навесим обработчик
    // навесить обработчик на что-то другое не получится поэтому нужно вполнить поиск querySelector
    const pic = node.content.querySelector('a');
    // добавляем обработчик вторым параметром передадим функцию из нашего же класса
    // только там потеряется this поэтому нужно сделать bind
    pic.addEventListener('click', this.click.bind(this));
    // либо вместо bind используем стрелочную функцию для связывания контекста.
    // pic.addEventListener('click', ()=>{this.click});

    // вернем наш HTML элемент с готовыми данными и обработчиком событий
    return node.content;
  }

  click(e) {
    e.preventDefault();
    console.log(this.data);
  }
}
