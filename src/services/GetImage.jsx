import axios from 'axios';

export const getImage = (imageName, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY_API = '17416890-a4cbe06baa9eb7d2b3a58d67d';

  const response = axios.get(
    `${BASE_URL}?q=${imageName}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
};

// return fetch(
//   `${BASE_URL}?q=${imageName}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
// );
