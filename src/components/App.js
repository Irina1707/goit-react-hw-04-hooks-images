
import { ToastContainer} from 'react-toastify';
import { useState } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';

export default function App() {

  const [searchQuery, setSearchQuery] = useState('');
  
  const handleFormSubmit = query => {
    setSearchQuery(query);
  }

    return ( 
        
        <AppStyle>     
        <Searchbar onSubmit={handleFormSubmit} />          
        <ImageGallery searchQuery={searchQuery} />
          <ToastContainer autoClose={3000} />      
       </AppStyle>
     )
   };

