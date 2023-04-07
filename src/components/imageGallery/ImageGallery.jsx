import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { List, ListItem } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <List>
      {images.map(image => {
        return (
          <ListItem key={image.id}>
            <ImageGalleryItem image={image} />
          </ListItem>
        );
      })}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
