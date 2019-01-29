import AbstractView from './AbstractView';
import { bigPictureTemplate } from '../templates';

export default class BigPicture extends AbstractView {
  constructor(data) {
    super(bigPictureTemplate, data);
    this.render();
  }

  bind() {
    const closeBtn = this.rendered.querySelector('#picture-cancel');
    closeBtn.addEventListener('click', (e) => {
      this.remove();
    });
  }

  remove() {
    console.log('zzzzz');
    this.data = null;
    this.template = null;
    this.rendered = null;
    this.container.innerHTML = '';
    this.container.classList.add('hidden');
    this.container = null;
  }

  append(container) {
    this.container = container;
    console.log(this.container);
    this.container.appendChild(this.rendered);
    this.container.classList.remove('hidden');
  }
}
