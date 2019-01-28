import AbstarctView from './AbstractView';
import { commentTemplate } from './templates';


export default class Comment extends AbstarctView {
  constructor() {
    super();
    this.template = commentTemplate;
    this.rendered = this.render();
  }

  render() {
    const { template } = this;
    const node = document.createElement('template');
    node.innerHTML = template();
    this.rendered = node;
    return node.content;
  }
}
