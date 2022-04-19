import React from 'react';
//import PropTypes from 'prop-types';
import { ImageGalleryItemImage, GalleryItem } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({webformatURL, searchQuery, onClick, largeImageURL}) {

  const onClickLargeImage = (event) => {
    //this.setState({ largeImageURL: event.target.dataset.large })
    onClick(largeImageURL);
  }
  
    return (
      <GalleryItem>
        <ImageGalleryItemImage src={webformatURL} alt={searchQuery} width='100' onClick={onClickLargeImage} />
      </GalleryItem>
    )
  }



//ImageGalleryItem.propTypes = {
//    onClick: PropTypes.string.isRequired,
//    webformatURL: PropTypes.string.isRequired,
//    largeImageURL: PropTypes.string.isRequired,
//    searchQuery: PropTypes.string.isRequired,
//}

