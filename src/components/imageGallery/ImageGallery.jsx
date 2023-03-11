import { Component } from 'react';
import PropTypes from 'prop-types';
import { getImage } from '../../services/GetImage';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Loader } from '../loader/Loader';
import { Button } from '../button/Button';
import { List, ListItem } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    totalHits: null,
  };

  componentDidUpdate(prevProps) {
    const { value, page } = this.props;
    const prevName = prevProps.value;
    const nextName = value;

    if (prevName !== nextName || prevProps.page !== page) {
      this.setState({
        loading: true,
      });

      getImage(nextName.trim(), page)
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }

          return Promise.reject(
            new Error(
              'Sorry, there are no images matching your search query. Please try again.'
            )
          );
        })
        .then(images => {
          console.log(images.hits);
          return this.setState(() => ({
            images:
              page === 1 ? images.hits : [...this.state.images, ...images.hits],
            totalHits: images.totalHits,
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { images, loading, error, totalHits } = this.state;

    return (
      <>
        {error && <h1>{error.message}</h1>}
        {loading && <Loader />}
        <>
          <List>
            {images.map(image => {
              return (
                <ListItem key={image.id}>
                  <ImageGalleryItem image={image} />
                </ListItem>
              );
            })}
          </List>
          {images.length < totalHits && (
            <Button onClick={this.props.handleLoad} />
          )}
          {totalHits === 0 && (
            <h1>
              Sorry, there are no images matching your search query. Please try
              again.
            </h1>
          )}
        </>
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  value: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  handleLoad: PropTypes.func.isRequired,
};
