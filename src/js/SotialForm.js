import AbstarctView from './AbstractView';
import { sotialFormtemplate } from './templates';


export default class SotialForm extends AbstarctView {
  constructor() {
    super();
    this.template = sotialFormtemplate;
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
