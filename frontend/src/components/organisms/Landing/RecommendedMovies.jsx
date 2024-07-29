import React, { useState } from "react";
import PrevButton from "../../atoms/PrevButton";
import NextButton from "../../atoms/NextButton";
import MovieCard from "../../molecules/MovieCard";

const RecommendedMovies = () => {
    // Sample movie data (replace with actual data)
    const movies = [
        { id: 1, title: "Kalki 2898 AD", genre: "Action/Sci-Fi/Thriller", imageUrl: "/assets/kalki.avif", rating: 8, votes: 70 },
        { id: 2, title: "Partners", genre: "Crime/Thriller", imageUrl: "/assets/Partners.avif", rating: 8, votes: 70 },
        { id: 3, title: "Ullozhukku", genre: "Drama/Family", imageUrl: "/assets/Ullozhukku.avif", rating: 8, votes: 70 },
        { id: 4, title: "Maharaja", genre: "Action/Drama", imageUrl: "/assets/Maharaja.avif", rating: 8, votes: 70 },
        { id: 5, title: "Despicable Me 4", genre: "Action/Adventure/Animation/Comedy", imageUrl: "/assets/Despicable.avif", rating: 8, votes: 70 },
        { id: 6, title: "Kanakarajyam", genre: "Drama/Family", imageUrl: "/assets/Kanakarajyam.avif", rating: 8, votes: 70 },
        { id: 7, title: "Dandupalayam", genre: "Crime/Thriller", imageUrl: "/assets/Dandupalayam.avif", rating: 8, votes: 70 },
        { id: 8, title: "Gaganachari", genre: "Comedy/Sci-Fi", imageUrl: "/assets/Gaganachari.avif", rating: 8, votes: 70 },
        { id: 9, title: "Oru Smartphone Prenayam", genre: "Romantic/Thriller", imageUrl: "/assets/OruSmartphonePrenayam.avif", rating: 8, votes: 70 },
        { id: 10, title: "Paradise", genre: "Drama/Romantic", imageUrl: "/assets/Paradise.avif", rating: 8, votes: 70 }
    ];

    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        if (startIndex + 5 < movies.length) {
            setStartIndex(prevIndex => prevIndex + 5);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(prevIndex => prevIndex - 5);
        }
    };

    return (
        <div className="container pt-5">
            <p className="h4">Recommended Movies</p>
            <div className="row row-cols-1 row-cols-md-5 g-4 position-relative">
                {movies.slice(startIndex, startIndex + 5).map((movie, index) => (
                    <div key={movie.id} className="col position-relative">
                        <MovieCard movie={movie} />
                        {index === 0 && startIndex > 0 && (
                            <PrevButton onClick={handlePrev} />
                        )}
                        {index === 4 && startIndex + 5 < movies.length && (
                            <NextButton onClick={handleNext} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default RecommendedMovies;
