import {React} from 'react';

const MovieListHeading = (props) => {
    return (
        <div className='col'>
            {/* This is prop for heading of web app  */}
            <h1>{props.heading}</h1>
        </div>
    )
}

export default MovieListHeading;