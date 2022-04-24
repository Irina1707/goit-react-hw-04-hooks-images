import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImage } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImageURL, searchQuery, children }) {

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () =>  window.removeEventListener('keydown', handleKeyDown) 
    })
   

    const handleKeyDown = event => {
         if (event.code === 'Escape') {
                onClose();
            }
    }

    const handleClickBackdrop = event => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }
   
    return createPortal(
            <Overlay onClick={handleClickBackdrop}>
                <ModalImage>
                    {children}
    <img src={largeImageURL} alt={searchQuery}  width='600'/>
  </ModalImage>
</Overlay>, modalRoot
        )
    }
