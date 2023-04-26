import axios from 'axios';
import Notiflix from 'notiflix';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const apiKey = '35658836-97de9db84549fa8436aad35d5';

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${apiKey}
        &q=${this.searchQuery}
        &image_type=photo
        &orientation=horizontal
        &safesearch=true
        &per_page=40&page=${this.page}`
      );
      const data = await response.data;
      this.page += 1;
      createImageList(data.hits);
    } catch (error) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
