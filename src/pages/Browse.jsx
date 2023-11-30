import { useData } from '../api/useData';
import { useState } from "react";
import { Link } from "react-router-dom";


export function Browse() {
    const { data } = useData(
      "https://ludvigsen.tech/wp-json/wp/v2/videogames?per_page=100&acf_format=standard"
  );
  const games = data;
  const [search, setsearch] = useState('');
  const handleSearch = (event) => {
    setsearch(event.target.value);
  }
    const filteredGames = games.filter((game) =>
    game.acf.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <>
    <div className="row row-cols-1 row-cols-md-4 g-4 p-4 justify-content-center">
      <div className="input-group mb-3 justify-content-center">
        <input type="search" value={search} onChange={handleSearch} className="form-control search" placeholder="search items..." aria-label="Search items" aria-describedby="basic-addon2" />
      </div>
        {filteredGames.map((game) => (
            <div className="card m-2 p-2 d-flex flex-column" key={game.id}>
              <img src={game.acf.image.url} className="card-img-top" alt="..." />
              <div className="card-body d-flex flex-column justify-content-end">
                <h5 className="card-title">{game.acf.title}</h5>
              <p className="card-text">{game.acf.price},-</p>
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