import React from "react";
import Slider from "react-slick";

const Carousel = () => {
    const settings = {
        dots: true,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '60px',
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
    };

    return (
        <div className="container-fluid carousel-container" style={{ margin: '0 auto', padding: '0px', width: '100%', color: '#333' }}>
            <Slider {...settings}>
                <div>
                    <img src="/assets/1.avif" className="d-block w-100 rounded" alt="..." />
                </div>
                <div>
                    <img src="/assets/2.avif" className="d-block w-100 rounded" alt="..." />
                </div>
                <div>
                    <img src="/assets/3.avif" className="d-block w-100 rounded" alt="..." />
                </div>
                <div>
                    <img src="/assets/4.avif" className="d-block w-100 rounded" alt="..." />
                </div>
            </Slider>
        </div>
    );
}

export default Carousel;
