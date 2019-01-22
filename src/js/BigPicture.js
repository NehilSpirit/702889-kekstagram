import Picture from './Picture';
import { bigPictureTemplate } from './templates';


export default class BigPicture extends Picture {
  constructor(data) {
    super(data);
    this.template = bigPictureTemplate;
  }
}
