import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal/Modal';
import { Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { largeImageURL, webformatURL, tags },
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Img src={webformatURL} alt={tags} onClick={toggleModal} />
      {isOpen && (
        <Modal
          largeImage={largeImageURL}
          name={tags}
          handleKeyDown={handleKeyDown}
          onClose={toggleModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
