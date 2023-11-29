import { useParams } from "react-router-dom";
import { useData } from '../api/useData';

function GameDetails({ game }) {
    return (
      <>
        <h2>{game.acf.title} - {game.acf.price},- NOK</h2>
        <p>{game.acf.description}</p>
        {/* Add more fields as necessary */}
      </>
    );
  }

export function Details() {
  const { id } = useParams();
  const newUrl = `https://ludvigsen.tech/wp-json/wp/v2/videogames/${id}/?per_page=100&acf_format=standard`;
  const { data } = useData(newUrl);
  const game = data;
  console.log(game);

  if (!game || !game.acf) {
    return <div>Loading...</div>;
  }
  const handleAddToCart = () => {
    addToCart(game);
    // Optionally, show a notification to the user or update any UI components
  };

  return (
    <section className="py-5">
      <h1>{game.acf.title}</h1>
      <img src={game.acf.image.url} alt={game.acf.title} />
      <h2>{game.acf.price},- NOK</h2>
      <p>Description: {game.acf.description}</p>
      <p>Genre: {game.acf.genre}</p>
      <button>Buy Now</button>
      <button onClick={handleAddToCart}>Add to cart</button>
    </section>
  )
}

function addToCart(game) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // Add game to cart
    cart.push(game);
    // Push to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Cartcounter update for Header
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }
  export default GameDetails;