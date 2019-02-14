import AbstarctView from './AbstractView';
import { commentTemplate } from '../templates';


export default class Comment extends AbstarctView {
  constructor(data) {
    super();
    this.template = commentTemplate;
    this.fragment = document.createDocumentFragment();
    this.socialComments = document.querySelector('.social__comments');
    this.commentsLoader = document.querySelector('.social__comments-loader'); 
    this.commentCount = document.querySelector('.social__comment-count');
    this.rendered = this.render(commentTemplate, data);
  }

  render(template, data) {
   data.slice(0, 5).map((comment) => {
    const node = document.createElement('template');
    node.innerHTML = template(comment);
    this.rendered = node.content;
    this.fragment.appendChild(this.rendered);
    return comment;
  });
   this.socialComments.appendChild(this.fragment);
  
  }
  
  append(container) {
    this.container = container;
    console.log(this.container);
    this.container.appendChild(this.rendered);
   
  } 

  remove() {
    this.data = null;
    this.template = null;
    this.rendered = null;
    this.container = null;
  }
  
  // добавляет новые комменты
  addComents(data) {
  let step = 5;
  let count = 5;
  this.commentsLoader.addEventListener('click', () => {
  this.render(commentTemplate, data.slice(count , count + step)); 
  if(count < data.length) {
    count += step; 
    this.commentCount.innerHTML = `${count} из <span class="comments-count">${data.length}</span> комментариев`;
  }
    if(count >= data.length ) {
      count = data.length; 
      this.commentCount.innerHTML = `${count} из <span class="comments-count">${data.length}</span> комментариев`;
      this.commentsLoader.classList.add('hidden');
    } 
  });
}
  
}

