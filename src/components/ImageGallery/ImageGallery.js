import { useEffect, useState } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import { ToastContainer } from 'react-toastify';
import API from '../imagesApi';
import Button from '../Button/Button';
import { Loader } from '../Loader/Loader';
import Modal from '../Modal/Modal'
import { ImageGalleryStyle } from './ImageGallery.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

export default function ImageGallery({ searchQuery }) {

  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
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
      setStatus(Status.PENDING)
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
  //   setStatus(Status.PENDING);
  //   setCurrentPage(currentPage + 1); 
  //   }

 const fetchImages = () => {
   setStatus(Status.PENDING);
   API.fetchImages(searchQuery, currentPage)
     .then((data) => {
       setImages(prevImages => [...prevImages, ...data.hits]);
       setCurrentPage((prevPage) => prevPage + 1);
       setStatus(Status.RESOLVED)
       setError(null)
     })
     .catch(error => {
       setError(error);
       setStatus(Status.REJECTED);
     })
     .finally(() => scroll());
  }

  const handleLargeImage = (image) => {
    setLargeImageURL(image);
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
  }
 
  return (
      <>
  {status === Status.REJECTED && <p>{error.message}</p>}
  {status === Status.PENDING && <Loader />} 
  <ToastContainer autoClose={3000} />
  {status === Status.RESOLVED && (
    <>
    <ImageGalleryStyle>
      {images && images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          alt={searchQuery}
          onClick={handleLargeImage} />))}
      </ImageGalleryStyle>;
    </>)}
  {showModal && <Modal largeImageURL={largeImageURL} onClose={closeModal} />}
  {images && status === Status.RESOLVED && <Button onClick={fetchImages} />}
      </>
      )
                     
}

