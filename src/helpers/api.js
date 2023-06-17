import axios from 'axios';

async function fetchImages (value, page, abortCtrl) {
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const API_KEY = '35770209-0f0794109d372fc2471926e98';
  const SEARCH_CONFIG = `q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`

  const responce = await axios.get(`?key=${API_KEY}&${SEARCH_CONFIG}`, {
    signal: abortCtrl.signal
  })
  
  return responce.data
}

export default fetchImages;
