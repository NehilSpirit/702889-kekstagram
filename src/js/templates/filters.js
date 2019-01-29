const filtersTemplate = () => `
<h2 class="img-filters__title  visually-hidden">Фильтр фотографий</h2>
      <form class="img-filters__form" action="index.html" method="get" autocomplete="off">
        <button type=button class="img-filters__button  img-filters__button--active" id="filter-popular">Популярные</button>
        <button type=button class="img-filters__button" id="filter-new">Новые</button>
        <button type=button class="img-filters__button" id="filter-discussed">Обсуждаемые</button>
      </form>`;

export default filtersTemplate;
