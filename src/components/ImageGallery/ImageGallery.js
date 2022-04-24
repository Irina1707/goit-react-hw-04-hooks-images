import { useEffect, useState } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import { ToastContainer } from 'react-toastify';
import API from '../imagesApi';
import Button from '../Button/Button';
import { Loader } from '../Loader/Loader';
import Modal from '../Modal/Modal'
import { ImageGalleryStyle } from './ImageGallery.styled';

export default function ImageGallery({ searchQuery }) {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [prevName, setPrevName] = useState("")
  
   const scroll = () => {
    window.scrollBy({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
     
    if (searchQuery !== prevName) {
      setCurrentPage(1)
      setLoading(true)
      setImages([]) 
      setPrevName(searchQuery)       
      }
}, [searchQuery, prevName] )
  
    useEffect(() => {
    if (!searchQuery) {
      return;
    }

     fetchImages();
  }, [searchQuery]);
 
  // const handleLoadMore = () => {
  //   scroll();
  //   setLoading(true);
  //   setCurrentPage(currentPage + 1); 
  //   }

 const fetchImages = () => {
   setLoading(true);
   
      API.fetchImages(searchQuery, currentPage)
        .then((data) => {
          setImages(prevImages => [...prevImages, ...data.hits]);
          setCurrentPage((prevPage) => prevPage + 1);
        })
      .catch(error => setError(error))
      .finally(() => {
        setLoading(false);
        scroll();
      });
  }

  const handleLargeImage = (image) => {
    setLargeImageURL(image);
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
  }
 
  const shouldRenderLoadMoreButton = images.length > 0 && !loading;
  
    return (
      <div>
        {error && <p>{error.message}</p>}
    
        {loading && <Loader />}
            <ToastContainer autoClose={3000} />
            
        {images.length > 0 && <ImageGalleryStyle>
            {images.map(({ id, webformatURL, largeImageURL}) => (
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    alt={searchQuery}
                    onClick={handleLargeImage} />))}
                </ImageGalleryStyle>}

        {showModal && <Modal largeImageURL={largeImageURL} onClose={closeModal}/>}
        {shouldRenderLoadMoreButton  && <Button onClick={fetchImages} />}
       </div>     
            );
}

