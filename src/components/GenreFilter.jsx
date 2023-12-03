import React from 'react';

const GenreFilter = ({ genres, selectedGenres, setSelectedGenres }) => {
    const handleGenreChange = (genre, isChecked) => {
        if (isChecked) {
            setSelectedGenres(prevGenres => [...prevGenres, genre]);
        } else {
            setSelectedGenres(prevGenres => prevGenres.filter(g => g !== genre));
        }
    };

    return (
        <div className="genre-filter input-group mb-3 justify-content-center">
            {genres.map(genre => (
                <div className='genre-filter__item form-check form-check-inline' key={genre}>
                    <input
                        className='genre-filter__checkbox form-check-input'
                        type="checkbox"
                        id={genre}
                        value={genre}
                        checked={selectedGenres.includes(genre)}
                        onChange={(e) => handleGenreChange(genre, e.target.checked)}
                    />
                    <label className='genre-filter__label form-check-label' htmlFor={genre}>{genre}</label>
                </div>
            ))}
        </div>
    );
};

export default GenreFilter;