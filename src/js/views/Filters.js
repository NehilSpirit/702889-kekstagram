import AbstractView from './AbstractView';
import { filtersTemplate } from '../templates';

export default class Filters extends AbstractView {
  constructor() {
    super(filtersTemplate);
    const imgFilters = document.querySelector('.img-filters');
    this.container = imgFilters;
    this.render();
  }

  bind() {
    const popular = this.rendered.querySelector('#filter-popular');
    const newFil = this.rendered.querySelector('#filter-new');
    const discussed = this.rendered.querySelector('#filter-discussed');
    popular.addEventListener('click', () => { this.onClickFilterPopular(); });
    newFil.addEventListener('click', () => { this.onClickFilterNew(); });
    discussed.addEventListener('click', () => { this.onClickFilterDiscussed(); });
  }

  append() {
    this.container.appendChild(this.rendered);
    this.container.classList.remove('img-filters--inactive');
  }
}
