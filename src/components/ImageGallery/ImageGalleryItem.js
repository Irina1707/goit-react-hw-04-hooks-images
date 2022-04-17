import React from 'react';
//import PropTypes from 'prop-types';
import { ImageGalleryItemImage, GalleryItem } from './ImageGalleryItem.styled';

class ImageGalleryItem extends React.Component {

  onClickLargeImage = (event) => {
    //this.setState({ largeImageURL: event.target.dataset.large })
    this.props.onClick(this.props.largeImageURL);
  }
  render() {
    const { webformatURL, searchQuery} = this.props;
    return (
      <GalleryItem>
        <ImageGalleryItemImage src={webformatURL} alt={searchQuery} width='100' onClick={this.onClickLargeImage} />
      </GalleryItem>
    )
  }
}


//ImageGalleryItem.propTypes = {
//    onClick: PropTypes.string.isRequired,
//    webformatURL: PropTypes.string.isRequired,
//    largeImageURL: PropTypes.string.isRequired,
//    searchQuery: PropTypes.string.isRequired,
//}

export default ImageGalleryItem;