import * as consts from './consts';
import createArrayObject from './mock-data';
import Picture from './Picture';
import BigPicture from './BigPicture';
import InfoBigPicture from './InfoBigPicture';
import Comment from './Comment';
import { dialogHandle, onMouseDown } from './slider';
import {
  previewFile, onChengeUploadFile, onClickCloseForm, onEscCloseForm, toggleClass,
} from './form';
import {
  filterChromeAndSepia,
  filterMarvin,
  filterPhobos,
  filterHeat,
  howClass,
  test,
  imgUploadEffectLevel,
} from './effect';


//import { pictureTemplate, commentTemplate, bigPictureTemplate } from './templates';

// куда добавим фотки
const blockPictures = document.querySelector('.pictures');
// генерируем фейк-данные
const photos = createArrayObject(consts.Num);
// фрагмент
const fragment = document.createDocumentFragment();

// создадим фотки и добавим в DOM
photos.forEach((data) => {
  // создаем экземпляр класса Picture с консруктор передаем данные
  const picture = new Picture(data);
  // добавим в фрагмент елемент с добавленными данными и навешенным обработчиком
  fragment.appendChild(picture.rendered);
});

// добавляем оптом
blockPictures.appendChild(fragment);

// добавляем большое фото в разметку
const bigPictureContainer = document.querySelector('.big-picture');
const bigPicturePreview = bigPictureContainer.querySelector('.big-picture__preview');
const bigPicture = new BigPicture(photos[2]);
bigPicturePreview.insertBefore(bigPicture.create('div', 'big-picture__img'), bigPicturePreview.firstChild);
//bigPictureContainer.classList.remove('hidden');

// добавляем инфо о большом фото в разметку
const infoBigPicture = new InfoBigPicture(photos[2]);
bigPicturePreview.insertBefore(infoBigPicture.create('div', 'big-picture__social', 'social'), bigPicturePreview.children[1]);

// добавляем коменты
const socialComments = new Comment(photos[2]);// тут надо создать несколько коментов, как?
const bigPictureSocial = document.querySelector('.big-picture__social');
bigPictureSocial.insertBefore(socialComments.create('ul', 'social__comments'), bigPictureSocial.children[2]);

dialogHandle.addEventListener('mousedown', onMouseDown);
