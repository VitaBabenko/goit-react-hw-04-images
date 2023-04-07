import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DivOverlay, DivModal } from './Modal.styled';

export const Modal = ({ largeImage, name, onClose, handleKeyDown }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return (
    <DivOverlay onClick={handleBackdropClick}>
      <DivModal>
        <img src={largeImage} alt={name} width="950" />
      </DivModal>
    </DivOverlay>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
