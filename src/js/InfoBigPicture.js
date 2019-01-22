import Picture from './Picture';
import { infoForBigPictuteTemplate } from './templates';


export default class InfoBigPicture extends Picture {
  constructor(data) {
    super(data);
    this.template = infoForBigPictuteTemplate;
  }
}
