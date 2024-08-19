import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './style.css'

const ACarousel = () =>{

  return (
    <Carousel 
      className="carousels" 
      showArrows={false} 
      emulateTouch={true} 
      showThumbs={false}
      autoPlay={true}
      interval={3000}
      infiniteLoop={true}
      stopOnHover={false}
    >
      <div >
        <img src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/slider_1.jpg?1692958575148" />
      </div>
      <div>
        <img src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/slider_2.jpg?1692958575148" />
      </div>
      <div>
        <img src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/slider_3.jpg?1692958575148" />
      </div>
      <div>
        <img src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/slider_4.jpg?1692958575148" />
      </div>
      <div>
        <img src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/slider_5.jpg?1692958575148" />
      </div>
    </Carousel>
  );

};




export default ACarousel;
