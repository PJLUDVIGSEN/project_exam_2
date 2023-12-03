import { useData } from '../api/useData';
import { useState, useEffect } from "react";
import GenreFilter from "../components/GenreFilter"
import GameCard from '../components/GameCard';
import LoadingIndicator from '../components/LoadingIndicator';

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
    const updatedCartItems = cartItems.slice(); // Copies cart
    const itemInCartIndex = updatedCartItems.findIndex(item => item.id === gameId);

    if (itemInCartIndex > -1) {
      updatedCartItems.splice(itemInCartIndex, 1);
    } else {
      const gameToAdd = games.find(game => game.id === gameId);
      updatedCartItems.push(gameToAdd);
    }

    setCartItems(updatedCartItems); // Update the state
    localStorage.setItem('cart', JSON.stringify(updatedCartItems)); // Update local storage
    window.dispatchEvent(new CustomEvent('cartUpdated')); // update cartcounter in Header
  };

  const isInCart = (gameId) => {
    return cartItems.some(item => item.id === gameId);
  };
  
  if (isLoading) {
    return (
      <LoadingIndicator />
    );
}
  return (
  <>
    <main className="row row-cols-1 row-cols-md-4 g-4 p-4 justify-content-center">
      <div className="input-group mb-3 justify-content-center">
        <input type="search" value={search} onChange={handleSearch} className="form-control search" placeholder="search items..." aria-label="Search items" aria-describedby="basic-addon2" />
      </div>
      <GenreFilter genres={genres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} isInCart={isInCart} handleCartClick={handleCartClick} />
          ))
        }
    </main>
  </>);
}