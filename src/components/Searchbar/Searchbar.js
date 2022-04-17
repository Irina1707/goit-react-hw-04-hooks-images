import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import PropTypes from 'prop-types';
import { SearchbarForm, SearchForm, SearchFormButton, SearchFormInput } from './Searchbar.styled';

export default class Searchbar extends Component {
    state = {
        query: ''
    }
    
    handleNameChange = event => {
        this.setState({
            query: event.currentTarget.value.toLowerCase()
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.query.trim() === '') {
            toast.warn("Please, enter something in the search box.");
            return;
        }

        this.props.onSubmit(this.state.query);

        this.setState({ query: '' });
    }
render() {
    return (
        <SearchbarForm>
            <SearchForm  onSubmit={this.handleSubmit}>
    <SearchFormButton type="submit"><ImSearch/>
    </SearchFormButton>

    <SearchFormInput
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={this.state.query}
      onChange={this.handleNameChange}
    />
  </SearchForm>
</SearchbarForm>
    )
    }
}

//Searchbar.propTypes = {
//  query: PropTypes.string.isRequired
//};