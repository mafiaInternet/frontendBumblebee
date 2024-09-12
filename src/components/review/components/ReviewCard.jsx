import { Rating } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

const ReviewCard = ({ review, star }) => {
  const dispatch = useDispatch();
  const [response, setResponse] = useState();
  const createResponse = () => {
    const data = {
      productId: review.productId,
      reviewId: review.id,
      response: response,
    };
    dispatch(createResponse(data));
  };

  return (
    <div className="review--card" key={review.id}>
      <h5 className="review--card--title">
        <b>{review.name}</b>
        <Rating value={star} readOnly></Rating>
      </h5>
      <p className="review--card--createAt">{review.createdAt ? moment(review.createdAt).format('DD/MM/YYYY HH:mm:ss') : ''}</p>
      <p className="review--card--description">{review.desciption}</p>
      {review.product ? (
        <div>
          <div>
            {/* <img loading="lazy" src={review.product.imageUrls[0]}></img> */}
          </div>
          <div>
            {/* <p>{review.product.title}</p> */}
          </div>
        </div>
      ) : (
        <div>
          <div>
            {/* <img loading="lazy" src={review.order.orderItems[0].imageUrl}></img> */}
          </div>
          <div>
            {/* <p>{review.order.orderItems[0].title}</p> */}
          </div>
        </div>
      )}
      <hr/>
    </div>
  );
};

export default ReviewCard;
