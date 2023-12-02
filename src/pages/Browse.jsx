import { useData } from '../api/useData';
import { useState } from "react";
import { Link } from "react-router-dom";


export function Browse() {
    const { data } = useData(
      "https://ludvigsen.tech/wp-json/wp/v2/videogames?per_page=100&acf_format=standard"
  );
  const genres = ["Racing", "Shooter", "Adventure", "Role-playing(RPG)", "Simulator", "Tactical", "Indie", "Sport"];
  const games = data;
  const [search, setsearch] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const handleSearch = (event) => {
    setsearch(event.target.value);
  }
    const filteredGames = games.filter((game) =>
    (selectedGenres.length === 0 || game.acf.genre.some(g => selectedGenres.includes(g))) &&
    game.acf.title.toLowerCase().includes(search.toLowerCase())
  );

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
              <img src={game.acf.image.url} className="card-img-top" alt="..." />
              <div className="card-body d-flex flex-column justify-content-end">
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