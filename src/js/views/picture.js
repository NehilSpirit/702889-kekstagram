import AbstractView from './AbstractView';
import { pictureTemplate } from '../templates';

export default class Picture extends AbstractView {
  constructor(data) {
    super(pictureTemplate, data);
    this.render();
  }

  bind() {
    const pic = this.rendered.querySelector('a');
    pic.addEventListener('click', ()=>{ this.onClick(); });
  }

  onClick(){
    console.log('click-clack');
  }

  remove() {
    this.data = null;
    this.template = null;
    this.rendered = null;
    this.container = null;
  }

  append(container){
    this.container = container;
    this.container.appendChild(this.rendered);    
  }
}
