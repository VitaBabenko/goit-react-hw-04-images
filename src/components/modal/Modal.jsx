import { Component } from 'react';
import PropTypes from 'prop-types';
import { DivOverlay, DivModal } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.handleKeyDown);
  }

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage, name } = this.props;

    return (
      <DivOverlay onClick={this.handleBackdropClick}>
        <DivModal>
          <img src={largeImage} alt={name} width="950" />
        </DivModal>
      </DivOverlay>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
