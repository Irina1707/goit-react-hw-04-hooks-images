import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import PropTypes from 'prop-types';
import { SearchbarForm, SearchForm, SearchFormButton, SearchFormInput } from './Searchbar.styled';

export default function Searchbar({onSubmit}) {
   const [query, setQuery] = useState('');
 //const [images, setImages] = useState([]);
  //const [currentPage, setCurrentPage] = useState(1);
    const handleNameChange = event => {
        setQuery(event.currentTarget.value.toLowerCase()
        );
    }

   const handleSubmit = event => {
       event.preventDefault();
       
    //setCurrentPage(1);
    //setImages([]);
        if (query.trim() === '') {
            toast.warn("Please, enter something in the search box.");
            return;
        }

        onSubmit(query);

       setQuery('');
      
    }

    return (
        <SearchbarForm>
            <SearchForm  onSubmit={handleSubmit}>
    <SearchFormButton type="submit"><ImSearch/>
    </SearchFormButton>

    <SearchFormInput
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={query}
      onChange={handleNameChange}
    />
  </SearchForm>
</SearchbarForm>
    )
    }


//Searchbar.propTypes = {
//  query: PropTypes.string.isRequired
//};