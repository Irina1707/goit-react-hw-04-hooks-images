
import { ToastContainer} from 'react-toastify';
import { useState } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';

export default function App() {

  const [searchQuery, setSearchQuery] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [images, setImages] = useState([]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
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
        
        <AppStyle>     
        <Searchbar onSubmit={handleFormSubmit} searchQuery={searchQuery}/>          
        <ImageGallery searchQuery={searchQuery} />
          <ToastContainer autoClose={3000} />      
       </AppStyle>
     )
   };

