import Notiflix from 'notiflix';

import NewsApiService from './api-servece';
import LoadMoreBnt from './loadMoreBnt';
const ul = document.querySelector('.ul');
const inputUl = document.querySelector('.input');
const formEl = document.querySelector('.search-form');

// const buttonEl = document.querySelector('.load-more');

const newsApiService = new NewsApiService();
const loadMoreBnt = new LoadMoreBnt({
  selector: '.load-more',
});

formEl.addEventListener('submit', onClickButtonSearch);
loadMoreBnt.refs.buttonEl.addEventListener('click', onClickButton);

function onClickButtonSearch(event) {
  event.preventDefault();

  clinCreateArticles();
  newsApiService.query = inputUl.value;
  // console.log(newsApiService.query);
  newsApiService.resetPage();
  onClickButton();
}

function onClickButton() {
  loadMoreBnt.disabled();
  newsApiService.fetchImages().then(images => {
    createArticles(images);
    loadMoreBnt.show();
    loadMoreBnt.enable();
    if (images.length <40) {    
  loadMoreBnt.hide();
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
} else {
  loadMoreBnt.show();
}
  });
}

function createImageList(images) {
  return images
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
    <p class="info-item">likes: 

      <b>${likes}</b>
    </p>
    <p class="info-item">views: 
      <b>${views}</b>
    </p>
    <p class="info-item">comments: 
      <b>${comments}</b>
    </p>
    <p class="info-item">downloads: 
      <b>${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
}

function createArticles(articles) {
  ul.insertAdjacentHTML('beforeend', createImageList(articles));
}

function clinCreateArticles() {
  ul.innerHTML = '';
}

// в кінці повідомити що більше немає фото


