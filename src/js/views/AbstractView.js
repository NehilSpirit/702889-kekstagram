export default class AbstarctView {
  constructor(template, initData) {
    this.data = initData;
    this.template = template;
  }

  render() {
    const { template, data } = this;
    const node = document.createElement('template');
    node.innerHTML = template(data);
    this.rendered = node.content;
  }


}
