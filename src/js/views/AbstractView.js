export default class AbstarctView {
  constructor(template, initData) {
    this.data = initData;
    this.template = template;
    console.log('call Abstract constructor');
  }

  render() {
    console.log('call render from Abstract');
    const { template, data } = this;
    const node = document.createElement('template');
    node.innerHTML = template(data);
    this.rendered = node.content;
    // this.bind(); 
  }

  bind() {
    console.log('call bind from Abstract');
  }
}
