import React from 'react';
import ProductHome from '../components/ProductHome';
import ACarousel from '../components/Carousel';

const Home = () => {
    return (
        <div className='home'>

            <ACarousel></ACarousel>
            <ProductHome></ProductHome>
       
        </div>
    );
}

export default Home;
