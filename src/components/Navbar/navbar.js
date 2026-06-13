import React from "react";
import "./navbar.css"
function Nav(){
    
 return(
    <div className="Navbar">
      <h1 className="Movieite">Movieite</h1>
      <div className="Navbar_links">
        <a href="#now_playing">Now-Playing</a>
        <a href="#popular">Popular</a>
        <a href="#top_rated">Top rated</a>
      </div>
    </div>

 );
}
export default Nav;