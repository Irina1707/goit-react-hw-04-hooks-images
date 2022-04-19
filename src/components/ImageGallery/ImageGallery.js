import { useEffect, useState } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import { ToastContainer, toast } from 'react-toastify';
import API from '../imagesApi';
import Button from '../Button/Button';
import { Loader } from '../Loader/Loader';
import Modal from '../Modal/Modal'
//import { ImSearch } from '/react-icons/fa';
import { ImageGalleryStyle } from './ImageGallery.styled';

export default function ImageGallery({ searchQuery }) {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const [prevName, setPrevName] = useState('');

  // useEffect(() => {
  //   if (searchQuery !== prevName) {
  //     setImages([]);
  //     //setCurrentPage(1);
  //     setPrevName(searchQuery);
  //     setLoading(true);
  //   }
    
  // },
  // [searchQuery, prevName])


  useEffect(() => {
    if (!searchQuery) {
      return;
    }
   
    fetchImages()
  }, [searchQuery]);
  
   const scroll = () => {
    window.scrollBy({
      top: 500,
      behavior: 'smooth',
    })
  }

  const fetchImages = () => {
    //setImages([]);
    setLoading(true);
    setCurrentPage(1);
   
    API.fetchImages(searchQuery, currentPage)
      .then((data) => {
        setImages([...data.hits]);
        setCurrentPage((prevPage) => prevPage + 1);
        setError(null);
        
        if (data.hits.length === 0) {
          toast.warn(`Sorry, there are no images matching ${searchQuery}. Please try again.`);
        }
      })
      .catch(error => setError(error))
      .finally(() => {
        setLoading(false);
        scroll();

      });
    }
    
 
  const handleLoadMore = () => {
    scroll();
    setLoading(true);
    setCurrentPage(currentPage + 1)
      
    API.fetchImages(searchQuery, currentPage)
      .then((data) => {
        setImages([...images, ...data.hits]);
        //setCurrentPage((prevPage) => prevPage + 1);
      })
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
    // if (status === 'idle') {
    //   return (<div>Введите что-нибудь в строку поиска</div>,
    //   <ToastContainer autoClose={3000}/>)
    // }
    // if (status === 'pending') {
    //   return <Loader />
    // }
    // if (status === 'rejected') {
    //   return <h2>{error.message}</h2>
    // }
    // if (status === 'resolved') {
    //      return (
    //   <Searchbar onSubmit={this.handleFormSubmit} searchQuery={searchQuery}/>,
    //   <ImageGallery images={images} />,
    // <Loader/>
    //      )

 
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
        {images.length > 0 && <Button onClick={handleLoadMore} />}
       </div>     
            );
}

