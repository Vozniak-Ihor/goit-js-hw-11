import axios from 'axios';
import Notiflix from 'notiflix';

const apiKey = '35658836-97de9db84549fa8436aad35d5';
const ul = document.querySelector('.ul');
const inputUl = document.querySelector('.input');
const buttonEl = document.querySelector('.button');

inputUl.addEventListener('input', event => {
  return event.currentTarget.value;
});
buttonEl.addEventListener('click', onClickButton);

function onClickButton(event) {
  event.preventDefault();
  const value = inputUl.value;
  fetchImages(value);
}
async function fetchImages(query) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    const data = response.data;
    createImageList(data.hits);
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
}

function createImageList(images) {
  const html = images
    .map(image => `<li><img src="${image.pageURL}" alt=\"${image.id}"></li>`)
    .join('');
  ul.innerHTML = html;
}
