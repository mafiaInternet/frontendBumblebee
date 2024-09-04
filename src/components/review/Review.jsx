import { Box, Button, Grid, Modal, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReviewByProduct,
} from "../../state/review/Action";
import ReviewCard from "./components/ReviewCard";

import ReviewForm from "./components/ReviewForm";

const Review = ({ product}) => {
  const dispatch = useDispatch();
  const { review, auth } = useSelector((store) => store);
  const [star, setStar] = useState("Tất cả");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const jwt = localStorage.getItem("jwt")
  const reviews = review.reviews.slice(1, 6);
  const totalStars = reviews.reduce((acc, item) => acc + (item.quantity * parseInt(item.star)), 0);
  const totalReviews = reviews.reduce((acc, item) => acc + item.quantity, 0);
  const averageStars = totalReviews === 0 ? 0 : totalStars / totalReviews;

  useEffect(() => {
    dispatch(getReviewByProduct(product.id));
  }, [product.id, review.review]);

  return (
    review.reviews && (
      <div className="review">
        <div className="review__summary ">
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <div className="review__summary__average">
                <p>{averageStars.toFixed(1)} / 5</p>
                <Rating
                  value={averageStars}
                  color="red"
                  precision={0.1}
                  readOnly
                />
                <p>({totalReviews} đánh giá)</p>
                {jwt && auth.user && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleOpen}
                  >
                    Gửi đánh giá của bạn
                  </Button>
                )}

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <ReviewForm product={product} setOpen={setOpen}></ReviewForm>
                </Modal>
              </div>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={4} md={3} lg={2.3}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setStar("Tất cả")}
                  >
                    Tất cả
                  </Button>
                </Grid>

                {review.reviews &&
                  review.reviews.slice(1, 6).map((item) => (
                    <Grid item xs={6} sm={4} md={3} lg={2.3}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setStar(item.star)}
                      >
                        {item.star} điểm ({item.quantity})
                      </Button>
                    </Grid>
                  ))}

                <Grid item xs={8} md={4.3}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setStar("Có hình ảnh")}
                  >
                    Có hình ảnh (0)
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className="review__list">
          {review.reviews.length > 0 &&
            review.reviews
              .find((item) => item.star === star)
              .reviews.map((review) => (
                <ReviewCard
                  review={review}
                  star={review.rating}
                  user={auth.user}
                />
              ))}
        </div>
      </div>
    )
  );
};

export default Review;
