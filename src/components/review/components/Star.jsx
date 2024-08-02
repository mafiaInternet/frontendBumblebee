import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
const Star = ({rating, setRating}) => {
  const [hover, setHover] = useState(5);
  // const [rating, setRating] = useState(5);
// console.log(props.setRating(3))
  return (
    <span style={{ marginLeft: "1rem" }}>
      {[...Array(5)].map((start, index) => (
        <FaStar
          className="star"
          size={30}
          color={index + 1 <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
          onMouseEnter={() => setHover(index + 1)}
          onMouseLeave={() => setHover(null)}
          onClick={() => setRating(index + 1)}
        ></FaStar>
      ))}
    </span>
  );
};

export default Star;
