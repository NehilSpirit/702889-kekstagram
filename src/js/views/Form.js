import axios from 'axios';
import AbstractView from './AbstractView';
import { formTemplate } from '../templates';
import * as consts from '../consts';
import Effects from './Effects';
import Slider from './Slider';
import Message from './Message';
import { successTemplate, errorTemplate } from '../templates';

export default class Form extends AbstractView {
    constructor() {
      super(formTemplate);
      const formContainer = document.querySelector('.img-upload__overlay');
      const urlSave = "https://js.dump.academy/kekstagram";
      this.formContainer = formContainer;
      this.urlSave = urlSave;
      this.render();
    }

    showForm() {
      this.bindEsc();
      this.formContainer.classList.remove('hidden');
    }
  
  // вешает обработчики на клик 
    bind() {
      const closeBtn = this.rendered.querySelector('#upload-cancel');
      closeBtn.addEventListener('click', (e) => {
        document.removeEventListener('keydown', this.onEscCloseForm );
        this.remove();
      });
    }

// вешает обработчики на esc
bindEsc() {
      this.onEscCloseForm = this.onEscCloseForm.bind(this);
      document.addEventListener('keydown', this.onEscCloseForm);
}
    
// скрывает  форму, удаляет обработчик
   onEscCloseForm(evt) {
  if (evt.keyCode === consts.escCode) {
     this.remove();
     document.removeEventListener('keydown', this.onEscCloseForm );
 }
} 
// скрывает форму
    remove() {
      console.log('zzzzz');
      this.container.classList.add('hidden');
      this.putDefault();
    }

 // подключает еффекты 
    toPlugEffects() {
        const effect = new Effects();
        effect.showEffect();
    }
// активирует слайдер 
    toPlugSlider() {
        const slider = new Slider();
        slider.drag();
    }
// добавляет форму в разметку
    append(container) {
      this.container = container;
      console.log(this.container);
      this.container.appendChild(this.rendered);
      this.run();
      this.uploadFile.addEventListener('change', () => { this.showForm() });
    }

     //добавляет свойства которых нет на момент вызова конструктора 
    run() { 
    this.form = document.querySelector('#upload-select-image');
    this.textHashtags = document.querySelector('.text__hashtags');
    this.textDescription = document.querySelector('.text__description');
    this.uploadFile = document.querySelector('#upload-file');
    this.successContainer = document.querySelector('#success');
    this.errorContainer = document.querySelector('#error');
    this.imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
    this.imgUpload = document.querySelector('.img-upload__effect-level');
    this.controlValue = document.querySelector('.scale__control--value');
    this.toPlugEffects();
    this.bindHashtags();
    this.toPlugSlider();
    this.save();
    }

    // обработчик на поле хештегов
  bindHashtags() {
    this.textHashtags.addEventListener('change', (evt) => {
      const val = evt.target.value;
      this.validityHeshtags(val);
    });
  }

  // очищает поля формы после загрузки
  putDefault() {
    this.uploadFile.value = '';
    this.textHashtags.value = '';
    this.textHashtags.style.border = '';
    this.textDescription.value = '';
    this.imgUploadPreviewImg.style.filter = '';
    this.imgUploadPreviewImg.style.transform = '';
    this.controlValue.value = '100%';
    const classes = this.imgUploadPreviewImg.classList;
    classes.value = 'effects__preview--none';
    this.imgUpload.classList.add('hidden');
  }
// создает сообщение успешной отправки формы
  renderMessageSuccess() {
    this.remove();
    document.removeEventListener('keydown', this.onEscCloseForm );
    const success = new Message(successTemplate);
    success.bindSuccess();
    success.append(this.successContainer);
  }

  // создает сообщение неуспешной отправки формы
  renderMessageError() {
    this.remove();
    document.removeEventListener('keydown', this.onEscCloseForm );
    const error = new Message(errorTemplate);
    error.bindError();
    error.append(this.errorContainer);
  }

    //валидация хештегов
 validityHeshtags(items) {
   let valid;
   let filter = items.split(' ', 5).filter((item) => item !== undefined )
   filter.every((item) => {
     if (item.charAt(0) === '#' && item.length > 2 && item.length < 20){
       return valid = true;
     } else {
      return valid = false;
     }
     }); 
     let set = new Set()
     filter.forEach((item) => { set.add(item); return set; })
      console.log(set);
      console.log(valid);
   if(valid === true ) {
      this.textHashtags.style.border = '';
      this.textHashtags.setCustomValidity('');
   } else { 
     this.textHashtags.style.border = '2px solid red';
     this.textHashtags.setCustomValidity('Хештег должен начинаться с #, иметь длину меньше 20 и больше 2 символов');
  }
 }
/* отправляет данные формы на сервер  */
request(formdata) {
    axios.post(this.urlSave, formdata )
      .then(response => { this.renderMessageSuccess()})// console.log(response)   console.log(err)вывожу чтоб видеть отправилось ли
      //.then( this.renderMessageSuccess(),  this.renderMessageError())
      .catch((err) => {this.renderMessageError()});
  } 

  // 
  save(){
this.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(this.form);
    this.request(formData);
  });
  }
  

  }

