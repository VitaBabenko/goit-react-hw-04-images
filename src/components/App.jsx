import { useState, useEffect } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { getImage } from '../services/GetImage';
import { Loader } from './loader/Loader';
import { Button } from './button/Button';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setLoading(true);

    getImage(imageName.trim(), page)
      .then(respImages => {
        console.log(respImages);
        return (
          page === 1
            ? setImages(respImages.data.hits)
            : setImages(prevImages => [...prevImages, ...respImages.data.hits]),
          setTotalHits(respImages.data.totalHits)
        );
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [imageName, page]);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
    setTotalHits(null);
  };

  const handleButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      {error && <h1>{error.message}</h1>}
      {images.length < totalHits && <Button onClick={handleButton} />}
      {totalHits === 0 && (
        <h1>
          Sorry, there are no images matching your search query. Please try
          again.
        </h1>
      )}
    </>
  );
};
