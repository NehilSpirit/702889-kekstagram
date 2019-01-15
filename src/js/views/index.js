// это файл index.js он лежит в папке views без него
// нам бы пришлось делать импорт
// import pictureTemplate from './views/picture.js'
// а с ним
// import { pictureTemplate } from './views';
// красота 😸
// к тому же тут можно переименовать экспорт
// export { pictureTemplate as picture, commentTemplate as comment };
// и тогда получим
// import { picture } from './views';
import pictureTemplate from './picture';
import commentTemplate from './comment';

export { pictureTemplate, commentTemplate };
