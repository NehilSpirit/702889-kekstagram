import AbstractView from './AbstractView';
import { pictureTemplate } from '../templates';

export default class Picture extends AbstractView {
  constructor(data) {
    console.log('call Picture constructor');
    super(pictureTemplate, data);
    this.render();
  }

  bind() {
    const pic = this.rendered.querySelector('a');// вот тут метод render вызывается ?
    pic.addEventListener('click', () => { this.onClick(); });// и опять onclick? мы же на 29 строке Абстракта вроде его вызывали?
  }

  onClick() {
  }

  remove() {
    this.data = null;
    this.template = null; // зачем мы это все обнуляем для каждого элемента? можно же просто innerHTML = '';??
    this.rendered = null;
    this.container = null;
  }

  append(container) {
    this.container = container;
    this.container.appendChild(this.rendered);    
  }
}
