import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImage } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMount() { 
        window.addEventListener('keydown', this.handleKeyDown)
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }
    
    handleKeyDown = event => {
         if (event.code === 'Escape') {
                this.props.onClose();
            }
    }

    handleClickBackdrop = event => {
        if (event.target === event.currentTarget) {
            this.props.onClose();
        }
    }
   
    render() {
        const { largeImageURL, searchQuery } = this.props;

        return createPortal(
            <Overlay onClick={this.handleClickBackdrop}>
                <ModalImage>
                    {this.props.children}
    <img src={largeImageURL} alt={searchQuery}  width='600'/>
  </ModalImage>
</Overlay>, modalRoot
        )
    }
}