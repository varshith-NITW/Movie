import Nav from "./components/Navbar/navbar";
import './App.css';
import MovieList from "./components/MovieList/MovieList";

function App() {
  return (
    <>
    <div className="App">
      <Nav className="Nav-Bar">Nav bar </Nav>
      <div className="Movies_list">
           <MovieList type="now_playing" title="Now Playing"></MovieList> 
           <MovieList type="popular" title="Popular"></MovieList> 
           <MovieList type="top_rated" title="Top Rated"></MovieList> 
      </div>
      
    </div>
    </>
    
  );
}

export default App;
