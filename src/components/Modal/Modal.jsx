import React from 'react';
// import PropTypes from 'prop-types';
import { Overlay, ModalImage } from './Modal.styled';

export const Modal = (image, onModalClick) => {
  const onModalOverlayClose = e => {
    if (e.currentTarget === e.target) {
      onModalClick();
    }
  };
  const { url, alt } = image;
  return (
    <Overlay onClick={onModalOverlayClose}>
      <ModalImage>
        <img src={url} alt={alt} />
      </ModalImage>
    </Overlay>
  );
};

// export class Modal extends React.Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleClick);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleClick);
//   }

//   handleClick = e => {
//     if (e.code === 'Escape') this.props.onModalClick();
//   };

//   onModalOverlayClose = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onModalClick();
//     }
//   };

//   render() {
//     const { url, alt } = this.props.image;

//     return (
//       <Overlay onClick={this.onModalOverlayClose}>
//         <ModalImage>
//           <img src={url} alt={alt} />
//         </ModalImage>
//       </Overlay>
//     );
//   }
// }
