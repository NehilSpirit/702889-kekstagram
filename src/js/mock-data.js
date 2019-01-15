import * as utils from './utils';
import * as consts from './consts';

export default function createArrayObject(number) {
  const pictures = [];
  for (let i = 0; i < number; i++) {
    pictures[i] = {
      url: `photos/${i + 1}.jpg`,
      likes: utils.getRandomNum(15, 200),
      comments: utils.getRandomNum(0, consts.descriptions.length),
      description: utils.getRandomElem(consts.descriptions),
    };
  }
  return pictures;
}
