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
    // loading animation !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return (
      <div className="lds-ellipsis justify-content-center">
      <div></div><div></div><div></div><div></div>
      </div>
    );
  }
  const handleAddToCart = () => {
    addToCart(game);
    // Optionally, show a notification to the user or update any UI components
  };

  return (
    <section className="container pb-5 mt-5">
      <div className="row">
        <div className="col-md-4">
        <img className="card-img-top" src={game.acf.image.url} alt={game.acf.title} />
        </div>
        <div className="col-md-6">
        <h1 className="font-syncopate">{game.acf.title}</h1>
        <div className="d-flex">
          <h1 className="font-crushed">GENRE: </h1>
          <h4 className="font-kanit genreclass pt-3">{game.acf.genre.join(", ")}</h4>
        </div>
        <h1 className="font-crushed">{game.acf.price},- NOK</h1>
        <button className="btn btn-dark mx-1">Buy Now</button>
        <button className="btn btn-success mx-1" onClick={handleAddToCart}>Add to cart</button>
        <p className="mt-2 font-kanit">{game.acf.description}</p>
        </div>
      </div>
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