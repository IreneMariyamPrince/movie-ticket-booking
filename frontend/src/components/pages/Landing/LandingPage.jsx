import React from 'react';
import LandingHeader from "../../organisms/Landing/LandingHeader";
import Carousel from '../../organisms/Landing/Carousel';
import RecommendedMovies from '../../organisms/Landing/RecommendedMovies';

const LandingPage = () => {
    return (
        <>
            <LandingHeader />
            <Carousel/>
            <RecommendedMovies/>
            <RecommendedMovies/>
            <RecommendedMovies/>
        </>
    );
};

export default LandingPage;
