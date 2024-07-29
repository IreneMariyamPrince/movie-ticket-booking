import React from 'react';
import styles from '../css/MovieCard.module.css';

const MovieCard = ({ movie }) => {
    return (
        <div className="cardi" style={{ width: '100%', position: 'relative' }}>
            <img src={movie.imageUrl} className="card-img-top rounded" alt={movie.title} style={{ width: '100%' }} />
            <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                    <p className="ps-2 mb-0"><i className="bi bi-star-fill text-danger"></i> {movie.rating}/10 &nbsp; {movie.votes} Votes</p>
                </div>
            </div>
            <h5 className="card-title pt-3">{movie.title}</h5>
            <p className="card-text text-secondary">{movie.genre}</p>
        </div>
    );
}

export default MovieCard;
