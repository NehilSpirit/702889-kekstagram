import AbstractView from './AbstractView';
import * as consts from '../consts';

export default class Message extends AbstractView {
    constructor(template) {
      super(template);
      this.render();
    }

    onEscCloseMessage(evt) { 
        if (evt.keyCode === consts.escCode) {
           this.remove();
           document.removeEventListener('keydown', this.onEscCloseMessage );
       }
      }
    
    bindSuccess() {
        const closeBtn = this.rendered.querySelector('.success__button');
        closeBtn.addEventListener('click', (e) => {
          document.removeEventListener('keydown', this.onEscCloseMessage );
          this.remove();
        });
          this.onEscCloseMessage = this.onEscCloseMessage.bind(this);
          document.addEventListener('keydown', this.onEscCloseMessage);
      }
// для сообщения ошибки
      bindError() {
        const closeBtns = this.rendered.querySelectorAll('.error__button');
        closeBtns.forEach(elem => {
            elem.addEventListener('click', (e) => {
                this.remove();
        });
    });        
        this.onEscCloseMessage = this.onEscCloseMessage.bind(this);
          document.addEventListener('keydown', this.onEscCloseMessage);
      }


      remove() {
        console.log('zzzzz');
        this.template = null;
        this.rendered = null;
        this.container.innerHTML = '';
        this.container = null;
      }
    
      append(container) {
        this.container = container;
        console.log(this.container);
        this.container.appendChild(this.rendered);
      }
    }
    