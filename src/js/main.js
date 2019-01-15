import * as consts from './consts';
import createArrayObject from './mock-data';
import Picture from './Picture';

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
  console.log(picture);
  // добавим в фрагмент елемент с добавленными данными и навешенным обработчиком
  fragment.appendChild(picture.rendered);
});

// добавляем оптом
blockPictures.appendChild(fragment);

