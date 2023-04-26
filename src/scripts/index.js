// import axios from 'axios';
// import Notiflix from 'notiflix';
import NewsApiService from './api-servece';
const ul = document.querySelector('.ul');
const inputUl = document.querySelector('.input');
const formEl = document.querySelector('.search-form');
const buttonEl = document.querySelector('.load-more');

const newsApiService = new NewsApiService();

formEl.addEventListener('submit', onClickButtonSearch);
buttonEl.addEventListener('click', onClickButton);

function onClickButtonSearch(event) {
  event.preventDefault();
  

  newsApiService.query = inputUl.value
  // console.log(newsApiService.query);
  newsApiService.resetPage(); 
  newsApiService.fetchImages().then(createImageList)
}

function onClickButton() {
  newsApiService.fetchImages().then(createImageList);
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
    <p class="info-item">likes
    
      <b>${likes}</b>
    </p>
    <p class="info-item">views
      <b>${views}</b>
    </p>
    <p class="info-item">comments
      <b>${comments}</b>
    </p>
    <p class="info-item">downloads
      <b>${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
  ul.innerHTML = html;
}
