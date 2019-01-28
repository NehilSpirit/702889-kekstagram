import { getRandomNum, getRandomElem } from './utils';
import { commentsArray } from './consts';

const avatar = `img/avatar-${getRandomNum(1, 6)}.svg`;
const message = `${getRandomElem(commentsArray)}  ${getRandomElem(commentsArray)}`;


const pictureTemplate = (data) => {
  const { url, comments, likes } = data;
  return `<a href="#" class="picture">
    <img class="picture__img" src="${url}" width="182" height="182" alt="Случайная фотография">
    <p class="picture__info">
        <span class="picture__comments">${comments}</span>
        <span class="picture__likes">${likes}</span>
    </p>
</a>`;
};

const commentTemplate = () => `
<li class="social__comment">
    <img class="social__picture" src= ${avatar} alt="Аватар комментатора фотографии" width="35" height="35">
    <p class="social__text">
        ${message}
    </p>
</li>`;

const bigPictureTemplate = (data) => {
  const { url } = data;
  return `<img src="${url}" alt="Девушка в купальнике" width="600" height="600">`;
};

const infoForBigPictuteTemplate = (data) => {
  const { comments, likes, description } = data;
  return ` <div class="social__header">
    <img class="social__picture" src="img/avatar-1.svg" alt="Аватар автора фотографии" width="35" height="35">
    <p class="social__caption">${description}</p>
    <p class="social__likes">Нравится <span class="likes-count">${likes}</span></p>
  </div> 
  <div class="social__comment-count">5 из <span class="comments-count">${comments}</span> комментариев</div>`;
};

const sotialFormtemplate = () => `<div class="social__footer">
  <img class="social__picture" src="img/avatar-6.svg" alt="Аватар комментатора фотографии" width="35" height="35">
  <input type="text" class="social__footer-text" placeholder="Ваш комментарий...">
  <button type="button" class="social__footer-btn" name="button">Отправить</button>
</div>
</div> `;

export {
  pictureTemplate,
  commentTemplate,
  bigPictureTemplate,
  infoForBigPictuteTemplate,
  sotialFormtemplate,
};
