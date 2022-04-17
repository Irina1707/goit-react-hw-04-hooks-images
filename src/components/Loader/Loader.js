//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from 'react-loader-spinner'
//import PropTypes from 'prop-types';
import { LoaderStyle } from './Loader.styled';

export const Loader = () => {

return (
       <LoaderStyle><Oval
    height="40"
    width="40"
    color='grey'
    ariaLabel='loading'
  /></LoaderStyle>
)
}
