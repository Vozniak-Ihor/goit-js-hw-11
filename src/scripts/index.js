// import axios from 'axios';
// import Notiflix from 'notiflix';
import NewsApiService from './api-servece';
const ul = document.querySelector('.ul');
const inputUl = document.querySelector('.input');
const buttonEl = document.querySelector('.button');
const buttonEl2 = document.querySelector('.load-more');

const newsApiService = new NewsApiService();

inputUl.addEventListener('input', event => {
  return event.currentTarget.value;
});
buttonEl.addEventListener('submit', onClickButton);
buttonEl2.addEventListener('click', onClickButton2);

function onClickButton(event) {
  event.preventDefault(); //не перезагружається
  newsApiService.query = inputUl.value;
  newsApiService.resetPage(); //тепер тільки 1 загружається сторінка
  newsApiService.fetchImages();
}

function onClickButton2() {
  newsApiService.fetchImages();
}

function createImageList(images) {
  const html = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
  ul.innerHTML = html;
}
