// import
import { Picture, BigPicture } from './views';
import createArrayObject from './mock-data';
import * as consts from './consts';

export default class App {
  constructor() {
    const picturesContainer = document.querySelector('.pictures');
    const bigpicContainer = document.querySelector('.big-picture');
    const data = [];
    const pics = [];
    this.state = {
      bigpicContainer,
      picturesContainer,
      data,
      pics,
    };
  }

  makeMockData() {
    this.state.data = createArrayObject(consts.Num);
    this.renderPics(this.state.data.slice(0));// тут просто скопировали масив? зачем?
  }

  renderPics(toRender) {
    const fragment = document.createDocumentFragment();
    this.state.pics = toRender.map((data) => {
      const picture = new Picture(data); // тут просто создается обьект? а когда вызывается метод render?
      picture.onClick = this.renderBigPicture.bind(this, data); // this на что указывает?
      picture.bind();
      picture.append(fragment);
      return picture;
    });
    this.removePics(); // вот что тут удаляется непонятно?
    this.state.picturesContainer.appendChild(fragment);
  }

  removePics() {
    this.state.pics.forEach((pic) => {
      pic.remove();
    });
    this.state.pics = [];
    //this.state.picturesContainer.innerHTML = '';
  }

  renderBigPicture(data) {
    console.log('bigpic data ', data);
    const bigpic = new BigPicture(data);
    // bigpic.bind(this.deleteBigPicture);
    bigpic.bind();
    bigpic.append(this.state.bigpicContainer);
  }

  deleteBigPicture() {
    this.state.bigpicContainer.innerHTML = '';
  }

  run() {
    this.makeMockData();
  }
}
