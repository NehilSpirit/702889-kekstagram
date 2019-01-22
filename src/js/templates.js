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


/* const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');

const bigPictureTemplate = (data) => {
  const {
    url, comments, likes, description,
  } = data;
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments;
  socialComments.innerHTML = commentTemplate('avatar', 'message');
  socialCaption.textContent = description;
}; */

export { pictureTemplate, commentTemplate, bigPictureTemplate, infoForBigPictuteTemplate };
