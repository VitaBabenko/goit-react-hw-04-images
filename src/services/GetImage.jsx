export const getImage = (searchImage, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY_API = '17416890-a4cbe06baa9eb7d2b3a58d67d';

  return fetch(
    `${BASE_URL}?q=${searchImage}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
