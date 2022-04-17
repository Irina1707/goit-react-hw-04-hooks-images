const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25444369-ba6b8c690cc86ce1f63d356ab';


 function fetchImages(searchQuery, currentPage) {
    
 return   fetch(`${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`No results were found for ${searchQuery}.`))
        })
        //.then(data => { return data.hits })
    //.then(console.log)
      
}
const api = {
   fetchImages, 
}
   
export default api ;