import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Star from "./Star";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../../state/review/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ReviewForm = ({product}) => {

  const dispatch = useDispatch()
  const [rating, setRating] = useState(5)
  const [files, setFiles] = useState([]);

  const handleFiles = (event) =>  {
    const imageUrls = event.target.files;

    const newPreviews = Array.from(imageUrls).slice(0, 3).map((file) => URL.createObjectURL(file));
    setFiles(newPreviews)
    
  };
  console.log(files)
  
  const responseReviewHandler = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log()
    const review = {
      productId: product,
      orderId: null,
      rating: rating,
      description: data.get("comment")
    }

    dispatch(createReview(review))
  }


  return  (<Box className="review__form" sx={style}>
        <h5 className="review__form__title">Đánh giá sản phẩm
        
        </h5>
        <p className="review__form__title__product">Product title</p>
        <form method="POST" onSubmit={responseReviewHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p className="rating d-flex">
                Đánh giá của bạn về sản phẩm: <Star rating={rating} setRating={setRating}></Star>
              </p>
            </Grid>
            <Grid item xs={12}>
              <TextField
              name="comment"
                placeholder="Nhập nội dung đánh giá của bạn về sản phẩm này"
                fullWidth
                multiline
              ></TextField>
            </Grid>
            <Grid item xs={12}>
            <label
                for="file-image-upload"
                className="custom-file-product-upload"
              >
                <span>Chọn tệp</span>
                <span>
                  {files.length === 0
                    ? "Tối đa 3 hình ảnh"
                    : `${files.length} tệp`}
                </span>
              </label>
              <input
                id="file-image-upload"
                type="file"
                name="files"
                multiple
                onChange={handleFiles}
              ></input>
              <Grid container spacing={1}>
                {files.map((file, index) => (
                  <Grid item xs={1} key={index}>
                    <img className="img-fluid" src={file} alt="imageUrl"></img>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button type="submit" variant="contained">Gửi đánh giá của bạn</Button>
            </Grid>
          </Grid>
        </form>
     
    </Box>
  );
};

export default ReviewForm;
