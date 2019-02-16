import axios from 'axios';
import { Picture, BigPicture, Filters, Form, Comment } from './views';

export default class App {
  constructor() {
    const picturesContainer = document.querySelector('.pictures');
    const bigpicContainer = document.querySelector('.big-picture');
    const formContainer = document.querySelector('.img-upload__overlay');
    const urlLoad = 'https://js.dump.academy/kekstagram/data';
    const data = [];
    const pics = [];
    this.state = {
      bigpicContainer,
      picturesContainer,
      formContainer,
      urlLoad,
      data,
      pics,
    };
  }

  load() {
    axios.get(this.state.urlLoad)
      .then(response => response.data)
      .then((data) => {this.state.data = data; this.renderPics([...data]); })
      .catch((err) => { console.log(err)});
  }

  renderPics(toRender) {
    const fragment = document.createDocumentFragment();
    this.state.pics = toRender.map((data) => {
      const picture = new Picture(data);
      picture.onClick = this.renderBigPicture.bind(this, data);
      picture.bind();
      picture.append(fragment);
      return picture;
      
    });
    this.removePics();
    this.state.picturesContainer.appendChild(fragment);
  }

  removePics() {
    this.state.pics.forEach((pic) => {
      pic.remove();
    });
    this.state.pics = [];
    this.state.picturesContainer.querySelectorAll('a.picture').forEach((pic) => {
      pic.parentNode.removeChild(pic);
    });
  }

  renderBigPicture(data) {
    const bigpic = new BigPicture(data);
    bigpic.bind();
    bigpic.append(this.state.bigpicContainer);
    this.renderComents(data.comments);
  }

  renderComents(data) {
    const comment = new Comment(data);
    comment.addComents(data);
  }

  // filters methods
  onClickFilterPopular() {
    const pops = this.state.data.slice(0);
    this.renderPics(pops);
  }

  onClickFilterNew() {
    const newPhoto = this.state.data.slice(0, 10);
    this.renderPics(newPhoto);
  }

  onClickFilterDiscussed() {
    const discussed = this.state.data.slice(0);
    discussed.sort((a, b) => a.likes - b.likes);
    this.renderPics(discussed.reverse());
  }
  
  // создает форму 
 renderForm() {
    const form = new Form();
    form.bind();
    form.append(this.state.formContainer);
  } 

  run() {
    this.load();
    // создаем фильтры и размещаем их при запуске приложения
    const filters = new Filters();
    filters.bind();
    filters.append();
    // вешаем обработчкик
    filters.onClickFilterPopular = this.onClickFilterPopular.bind(this);
    filters.onClickFilterNew = this.onClickFilterNew.bind(this);
    filters.onClickFilterDiscussed = this.onClickFilterDiscussed.bind(this);
    this.renderForm();
  }
  

}

