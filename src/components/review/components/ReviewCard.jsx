import { Rating } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
const ReviewCard = ({ review, star }) => {
  const dispatch = useDispatch();
  const [response, setResponse] = useState();
  const [openComment, setOpenComment] = useState({ id: null, status: false });
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
      <p className="review--card--createAt">{review.createdAt}</p>
      <p className="review--card--description">{review.desciption}</p>
      {review.product ? (
        <div>
          <div>
            {/* <img src={review.product.imageUrls[0]}></img> */}
          </div>
          <div>
            <p>{review.product.title}</p>
          </div>
        </div>
      ) : (
        <div>
          <div>
            {/* <img src={review.order.orderItems[0].imageUrl}></img> */}
          </div>
          <div>
            {/* <p>{review.order.orderItems[0].title}</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
