import Picture from './Picture';
import { commentTemplate } from './templates';


export default class Comment extends Picture {
  constructor(data) {
    super(data);
    this.template = commentTemplate;
  }
}
