import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game, isInCart, handleCartClick }) => {
    return (
        <div className="game-card card m-2 p-2 d-flex flex-column">
            <div className="game-card__image-container">
                <img src={game.acf.image.url} className="card-img-top" alt={game.acf.title} />
                <i 
                    className={isInCart(game.id) ? "bi bi-heart-fill game-card__cart-symbol" : "bi bi-heart game-card__cart-symbol"} 
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
    );
};

export default GameCard;