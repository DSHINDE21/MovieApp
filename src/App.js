import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import userEvent from '@testing-library/user-event';

const App = () => {
  // setMovies is a setter 
  const [movies,setMovies] = useState([
// [] is an empty array now after commenting below part
/* This is used in beggining , when we not created setter setMovies(),
Now i am commenting this or i can remove 
    {
      "Title": "Star Wars: Episode IV - A New Hope",
      "Year": "1977",
      "imdbID": "tt0076759",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg"
  },
  {
      "Title": "Star Wars: Episode V - The Empire Strikes Back",
      "Year": "1980",
      "imdbID": "tt0080684",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
  },
  {
      "Title": "Star Wars: Episode VI - Return of the Jedi",
      "Year": "1983",
      "imdbID": "tt0086190",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
  },
  
  {
    "Title": "Star Wars: Episode VII - The Force Awakens",
    "Year": "2015",
    "imdbID": "tt2488496",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg"
},
{
    "Title": "Star Wars: Episode I - The Phantom Menace",
    "Year": "1999",
    "imdbID": "tt0120915",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
},
{
    "Title": "Star Wars: Episode III - Revenge of the Sith",
    "Year": "2005",
    "imdbID": "tt0121766",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg"
},
{
    "Title": "Star Wars: Episode II - Attack of the Clones",
    "Year": "2002",
    "imdbID": "tt0121765",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
},
{
    "Title": "Rogue One: A Star Wars Story",
    "Year": "2016",
    "imdbID": "tt3748528",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg"
},
{
    "Title": "Star Wars: Episode VIII - The Last Jedi",
    "Year": "2017",
    "imdbID": "tt2527336",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg"
},
{
    "Title": "Star Wars: Episode IX - The Rise of Skywalker",
    "Year": "2019",
    "imdbID": "tt2527338",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SX300.jpg"
}
*/
  ]);

  //To Seach dyanamiclly State object 

  const [seachValue, setSearchValue] = useState('');
  // state to add movies to favorites list
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (seachValue) => {
  //This is API link  

//   const url = 'http://www.omdbapi.com/?s=avengers&apikey=686ccada'
  // This is modified API link takes searchValue from searchBox componenet  
  
  const url = `http://www.omdbapi.com/?s=${seachValue}&apikey=686ccada`;
 

  const response = await fetch(url);

  const responseJson = await response.json();
  // console.log(responseJson);

  if(responseJson.Search){
  //call the setter
  setMovies(responseJson.Search) 
  }

};

//Actual request from search box
useEffect(() =>{
  getMovieRequest(seachValue);
}, [seachValue]);

useEffect(() => {
    const movieFavourites = JSON.parse(
        localStorage.getItem('react-movie-app-favourites')
    );

    if (movieFavourites) {
        setFavourites(movieFavourites);
    }
}, []);

// Function to store movies when click on addfavorite or update list / in short a fuction to update our state
const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);

    // To save locally
    saveToLocalStorage(newFavouriteList)
}

// Function to remove movie from a list with the help of imdbID
const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
        (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);

    //local storage
    saveToLocalStorage(newFavouriteList);
}

// Function to save data to local storage
const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
}
  //here all components imported
  return<div className='container-fluid movie-app'>

        {/* Heading component*/}
        <div className='row d-flex align-items-center mt-4 mb-4'> 
            <MovieListHeading  heading = "Movies"/>

            {/* Search Box  component*/}
            <SearchBox seachValue={seachValue} setSearchValue={setSearchValue}/>
        </div>
     
        {/* movies List slider */}
        <div className='row'>
          <MovieList movies = {movies} favouriteComponent ={AddFavourites}
        //  To handle favorite 
         handleFavouritesClick = {addFavouriteMovie}/>
        </div>

        {/* Now Favorite part display  */}
        <div className='row d-flex align-items-center mt-4 mb-4'> 
            <MovieListHeading  heading = "Favourites"/>
        </div>
        
        {/* Favourites movies List slider */}
        <div className='row'>
          <MovieList movies = {favourites} favouriteComponent ={RemoveFavourites}
        //  To handle favorite 
         handleFavouritesClick = {removeFavouriteMovie}/>
        </div>
    </div>
  
};

export default App
