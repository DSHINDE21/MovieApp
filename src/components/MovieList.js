import react from 'react';


//prop
const MovieList = (props) => {
    const FavoriteComponent = props.favouriteComponent;

    return (
        <>
            {props.movies.map((movie, index) => 
            <div className='image-container d-flex justify-content-start m-3'>
                <img src={movie.Poster} alt='movie'></img>
                {/* On hover effect  */}
                <div className='overlay d-flex align-items-center justify-content-center'
                onClick={() =>props.handleFavouritesClick(movie)}>
                    <FavoriteComponent/>
                </div>
                    
                {/* <h1 > {movie.Title}</h1> */}
            </div>)}
        
        </>
    )
};

export default MovieList;