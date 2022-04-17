
import { ToastContainer} from 'react-toastify';
import { useState } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';
//import imagesApi from './imagesApi';
//import { Loader } from './Loader/Loader';
//import Modal from './Modal/Modal'

//import { ImSearch } from '/react-icons/fa';
//const BASE_URL = 'https://pixabay.com/api/';
//const API_KEY = '25444369-ba6b8c690cc86ce1f63d356ab';


export default function App() {

  const { searchQuery, setSearchQuery } = useState('');

  // state = { 
    // searchQuery: '', 
  // }

 

  const handleFormSubmit = query => {
    setSearchQuery({
      searchQuery: query,
      currentPage: 1,
      images: [] 
    });

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

