import * as consts from './consts';
import createArrayObject from './mock-data';
import Picture from './Picture';
import BigPicture from './BigPicture';
import InfoBigPicture from './InfoBigPicture';
import Comment from './Comment';
import AbstarctView from './AbstractView';
import {
 pictureTemplate, commentTemplate, bigPictureTemplate, infoForBigPictuteTemplate, sotialFormtemplate
} from './templates';
import SotialForm from './SotialForm';

// куда добавим фотки
const blockPictures = document.querySelector('.pictures');
// генерируем фейк-данные
const photos = createArrayObject(consts.Num);
console.log(photos);
// фрагмент
const fragment = document.createDocumentFragment();

// создадим фотки и добавим в DOM
photos.forEach((data) => {
  // создаем экземпляр класса Picture с консруктор передаем данные
  const picture = new Picture(data);
  picture.clickHandler = (e) => {
    console.log('click-clack');
  };
  // добавим в фрагмент елемент с добавленными данными и навешенным обработчиком
  fragment.appendChild(picture.rendered);
});

// добавляем оптом
blockPictures.appendChild(fragment);

// добавляем большое фото в разметку
const bigPictureContainer = document.querySelector('.big-picture');
const bigPicturePreview = bigPictureContainer.querySelector('.big-picture__preview');
const bigPicture = new BigPicture(photos[2]);
bigPicturePreview.insertBefore(bigPicture.rendered, bigPicturePreview.firstChild);
bigPictureContainer.classList.remove('hidden');

// добавляем инфо о большом фото в разметку
const infoBigPicture = new InfoBigPicture(photos[2]);
const bigPictureSocial = bigPicturePreview.querySelector('.big-picture__social');
bigPictureSocial.insertBefore(infoBigPicture.rendered, bigPictureSocial.children[0]);

// добавляем коменты
const comments = new Comment(photos[2]);
const socialComments = bigPicturePreview.querySelector('.social__comments');
socialComments.appendChild(comments.rendered);

// добавим форму отправки сообщения
const sotialForm = new SotialForm(photos[2]);
const canselbutton = bigPictureSocial.querySelector('.big-picture__cancel');
bigPictureSocial.insertBefore(sotialForm.rendered, canselbutton);
// dialogHandle.addEventListener('mousedown', onMouseDown);
