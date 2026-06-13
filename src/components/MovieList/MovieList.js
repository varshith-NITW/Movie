/*import React, { useEffect, useState} from "react";
import "./MovieList.css"
import Moviecard from "./Moviecard"
import lodash, { filter, sortBy } from "lodash";
function MovieList({type,title}){
   const [movies,setMovies]=useState([]);
   const [minrating,setMinrating]=useState(0);
   const [filtermovies,setFiltermovies]=useState([]);
   const [sort,setSort]=useState({
    by:"default",
    order:"asc"
   })
  
   useEffect(()=>{
    fetchMovies();
      },[])

  useEffect(()=>{
    if(sort.by !=="default"){
      const sorted =lodash.orderBy(movies,[sort.by],[sort.order])
      setFiltermovies(sorted);
    }
  },[sort,movies])
      const fetchMovies =async()=>{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=ad5dd4cfa344af7475edcd75ed8c9448`);
        const data= await response.json();
       setMovies(data.results);
       setFiltermovies(data.results);
      }


   const handlefilter=rate=>{
    if(rate===minrating){
      setMinrating(0);
      setFiltermovies(movies);
    }else{
     setMinrating(rate);
     const filtered =movies.filter(movie=>movie.vote_average >=rate);
     setFiltermovies(filtered);
   }
  }
  
  const handlesort= (e)=>{
          const{name,value}=e.target;
          setSort((prev)=>({...prev,[name]:value}));
  }
   
    return(
       <section className="Movie_list_section" id={type}>
        <header className="Movie_list_header"> 
            <h2 className="Movie_list_heading">{title} Movies</h2>
             <div className="Movie_list_fil_sort">
              <ul className="Movie_list_filter">
                <li className={minrating===8?"Movie_list_filter_star active":"Movie_list_filter_star"} onClick={()=>handlefilter(8)}>8+ ✰</li>
                <li className={minrating===7?"Movie_list_filter_star active":"Movie_list_filter_star"} onClick={()=>handlefilter(7)}>7+ ✰</li>
                <li className={minrating===6?"Movie_list_filter_star active":"Movie_list_filter_star"} onClick={()=>handlefilter(6)}>6+ ✰</li>
              </ul>
              <select name="by" onChange={handlesort} value={sort.by} id="" className="Movie_sort">
                <option value="default">Sort By </option>
                <option value="release_date">Date</option>
                <option value="vote_average">Rating </option>
              </select>
              <select name="order" onChange={handlesort} value={sort.order}  id="" className="Movie_sort">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
             </div>
        </header>

        <div className="Movie_cards">
          {
             filtermovies.map(movie=><Moviecard key={movie.id} movie={movie}></Moviecard>)
          }
        </div>
       </section>
    );
}

export default MovieList;
*/
import React, { useEffect, useState, useMemo } from "react";
import "./MovieList.css";
import Moviecard from "./Moviecard";
import lodash from "lodash";

function MovieList({ type, title }) {
  const [movies, setMovies] = useState([]);
  const [minrating, setMinrating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  // 1. Fetch movies whenever the 'type' prop changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${type}?api_key=ad5dd4cfa344af7475edcd75ed8c9448`
        );
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [type]);

  // 2. Derive filtered and sorted movies dynamically using useMemo
  const processedMovies = useMemo(() => {
    // Step A: Filter
    let result = movies;
    if (minrating > 0) {
      result = result.filter((movie) => movie.vote_average >= minrating);
    }

    // Step B: Sort
    if (sort.by !== "default") {
      result = lodash.orderBy(result, [sort.by], [sort.order]);
    }

    return result;
  }, [movies, minrating, sort]);

  // Toggle filter on/off
  const handlefilter = (rate) => {
    setMinrating((prevRate) => (prevRate === rate ? 0 : rate));
  };

  const handlesort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="Movie_list_section" id={type}>
      <header className="Movie_list_header">
        <h2 className="Movie_list_heading">{title} Movies</h2>
        <div className="Movie_list_fil_sort">
          <ul className="Movie_list_filter">
            <li
              className={minrating === 8 ? "Movie_list_filter_star active" : "Movie_list_filter_star"}
              onClick={() => handlefilter(8)}
            >
              8+ ✰
            </li>
            <li
              className={minrating === 7 ? "Movie_list_filter_star active" : "Movie_list_filter_star"}
              onClick={() => handlefilter(7)}
            >
              7+ ✰
            </li>
            <li
              className={minrating === 6 ? "Movie_list_filter_star active" : "Movie_list_filter_star"}
              onClick={() => handlefilter(6)}
            >
              6+ ✰
            </li>
          </ul>
          <select name="by" onChange={handlesort} value={sort.by} className="Movie_sort">
            <option value="default">Sort By </option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating </option>
          </select>
          <select name="order" onChange={handlesort} value={sort.order} className="Movie_sort">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="Movie_cards">
        {processedMovies.map((movie) => (
          <Moviecard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieList;


