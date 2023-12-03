import { useData } from '../api/useData';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export function Browse() {
    const { data, isLoading } = useData(
      "https://ludvigsen.tech/wp-json/wp/v2/videogames?per_page=100&acf_format=standard"
  );
  const genres = ["Racing", "Shooter", "Adventure", "Role-playing(RPG)", "Simulator", "Tactical", "Indie", "Sport"];
  const games = data;
  const [search, setsearch] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const handleSearch = (event) => {
    setsearch(event.target.value);
  }
    const filteredGames = games.filter((game) =>
    (selectedGenres.length === 0 || game.acf.genre.some(g => selectedGenres.includes(g))) &&
    game.acf.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const loadedCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(loadedCartItems);
  }, []);

  const handleCartClick = (gameId) => {
    const updatedCartItems = cartItems.slice(); // Create a copy of the cart items
    const itemInCartIndex = updatedCartItems.findIndex(item => item.id === gameId);

    if (itemInCartIndex > -1) {
      updatedCartItems.splice(itemInCartIndex, 1);
    } else {
      const gameToAdd = games.find(game => game.id === gameId);
      updatedCartItems.push(gameToAdd);
    }

    setCartItems(updatedCartItems); // Update the state
    localStorage.setItem('cart', JSON.stringify(updatedCartItems)); // Update the local storage
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const isInCart = (gameId) => {
    return cartItems.some(item => item.id === gameId);
  };
  
  if (isLoading) {
    return (
            <div className="lds-ellipsis justify-content-center">
                <div></div><div></div><div></div><div></div>
            </div>
    );
}
  return (
  <>
    <div className="row row-cols-1 row-cols-md-4 g-4 p-4 justify-content-center">
      <div className="input-group mb-3 justify-content-center">
        <input type="search" value={search} onChange={handleSearch} className="form-control search" placeholder="search items..." aria-label="Search items" aria-describedby="basic-addon2" />
      </div>
      <div className="input-group mb-3 justify-content-center">
        {genres.map((genre) => (
          <div className='form-check form-check-inline' key={genre}>
            <input
              className='form-check-input'
              type="checkbox"
              id={genre}
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres((prev) => [...prev, genre]);
                } else {
                  setSelectedGenres((prev) => prev.filter((g) => g !== genre));
                }
              }}
            />
            <label className='form-check-label' htmlFor={genre}>{genre}</label>
          </div>
        ))}
      </div>
        {filteredGames.map((game) => (
            <div className="card m-2 p-2 d-flex flex-column" key={game.id}>
        <div className="image-container">
            <img src={game.acf.image.url} className="card-img-top" alt="..." />
            <i 
                className={isInCart(game.id) ? "bi bi-heart-fill cartSymbol" : "bi bi-heart cartSymbol"} 
                onClick={() => handleCartClick(game.id)}
            ></i>
        </div>

              <div className="card-body d-flex flex-column">
                <h5 className="font-syncopate card-title">{game.acf.title}</h5>
              <h2 className="font-crushed card-text">{game.acf.price},-</h2>
              <Link to={`/${game.id}`}>
                <button className="btn btn-primary btn-dark">More info</button>
            </Link>
            </div>
            </div>
          ))
        }
    </div>
  </>);
}