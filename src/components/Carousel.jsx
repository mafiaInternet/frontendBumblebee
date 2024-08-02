import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ACarousel = () =>{

  return (
    <Carousel className="carousel" showArrows={false} emulateTouch={true} showThumbs={false}>
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
