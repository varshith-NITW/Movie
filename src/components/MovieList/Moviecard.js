import React from "react";
import "./Moviecard.css";

function Moviecard({movie}){
    return(
     <>
     <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" className="Movie_card" rel="noreferrer">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
         alt="Movie poster" 
         className="Movie_poster"/>
     
     <div className="Movie_details">
         <h3 className="Movie_details_heading">{movie.title}</h3>
         <div className="movie_date_rate">
                 <p>{movie.release_date}</p>
                 <p>{movie.vote_average}✰</p>
         </div>
         <p className="Movie_description">
            {movie.overview.slice(0,100)+"..."}
         </p>

     </div>
     </a>
     </>
    );
}

export default Moviecard;