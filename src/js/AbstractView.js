export default class AbstarctView {
  constructor(template, initData) {
    this.initData = initData;
    this.template = template;
  }

  render() {
    const { template, initData } = this;
    const node = document.createElement('template');
    node.innerHTML = template(initData);
    this.rendered = node;
    // связывание с обработчиками событий
    this.bind();
    return node.content;
  }

  // оставим пустым, переопределим в потомках
  // но он нам нужен чтобы не ругался компилятор в стр. 11
  bind() {}
}
