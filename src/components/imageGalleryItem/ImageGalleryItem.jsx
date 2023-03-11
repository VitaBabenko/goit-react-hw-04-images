import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal/Modal';
import { Img } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.setState({ isOpen: false });
    }
  };

  render() {
    const {
      image: { largeImageURL, webformatURL, tags },
    } = this.props;

    return (
      <>
        <Img src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {this.state.isOpen && (
          <Modal
            largeImage={largeImageURL}
            name={tags}
            handleKeyDown={this.handleKeyDown}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
