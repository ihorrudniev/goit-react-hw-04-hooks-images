import { useEffect } from 'react';
// import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, bigURL }) {
  useEffect(() => {
    window.removeEventListener('keydown', keyDownHandler);
  });
  const keyDownHandler = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const overlayClickHandler = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={overlayClickHandler}>
      <div className="Modal">
        <img src={bigURL} alt="" />
      </div>
    </div>,
    modalRoot,
  );
}

// class oldModal extends Component {
// componentDidMount() {
//   window.addEventListener('keydown', this.keyDownHandler);
// }

// componentWillUnmount() {
//   window.removeEventListener('keydown', this.keyDownHandler);
// }

// keyDownHandler = e => {
//   if (e.code === 'Escape') {
//     this.props.onClose();
//   }
//   };

//   overlayClickHandler = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className="Overlay" onClick={this.overlayClickHandler}>
//         <div className="Modal">
//           <img src={this.props.bigURL} alt="" />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

// export default oldModal;
