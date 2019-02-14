import AbstractView from './AbstractView';
import { bigPictureTemplate } from '../templates';
import * as consts from '../consts';

export default class BigPicture extends AbstractView {
  constructor(data) {
    super(bigPictureTemplate, data);
    this.body = document.querySelector('body');
    this.render();
  }

  bind() {
    const closeBtn = this.rendered.querySelector('#picture-cancel');
    closeBtn.addEventListener('click', (e) => {
      this.remove();
      document.removeEventListener('keydown', this.onEscClosePicture );
    });
    this.onEscClosePicture = this.onEscClosePicture.bind(this);
      document.addEventListener('keydown', this.onEscClosePicture);
  }

  onEscClosePicture(evt) {
    if (evt.keyCode === consts.escCode) {
       this.remove();
       document.removeEventListener('keydown', this.onEscClosePicture );
   }
  }

  remove() {
    this.data = null;
    this.template = null;
    this.rendered = null;
    this.container.innerHTML = '';
    this.container.classList.add('hidden');
    this.body.classList.remove('.modal-open');
    this.container = null;
  }

  append(container) {
    this.container = container;
    this.container.appendChild(this.rendered);
    this.container.classList.remove('hidden');
    this.body.classList.add('.modal-open');
  }
}
