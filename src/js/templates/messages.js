
const successTemplate = () => {
return `<section class="success">
      <div class="success__inner">
        <h2 class="success__title">Изображение успешно загружено</h2>
        <button type="button" class="success__button">Круто!</button>
      </div>
    </section>`
}

 const errorTemplate = () => {
    return `<section class="error">
    <div class="error__inner">
      <h2 class="error__title">Ошибка загрузки файла</h2>
      <div class="error__buttons">
        <button type="button" class="error__button">Попробовать снова</button>
        <button type="button" class="error__button">Загрузить другой файл</button>
      </div>
    </div>
  </section>`

}
export { successTemplate, errorTemplate };