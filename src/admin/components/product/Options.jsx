import { Button, Grid, TextField } from "@mui/material";
import React, { useRef, useState } from "react";

const Options = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  console.log(files);
  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
    console.log(files);
  };
  return (
    <div className="demo__container">
    <h1>Add product</h1>
     <div className="demo">
     <div className="demo__img">
        <div className="demo__img__main">
        <img loading="lazy" className="img-fluid" src="https://cdn.boo.vn/media/catalog/product/1/_/1.2.06.3.06.001.223.23.10500011_2__4.jpg"></img>
        </div>
        <div className="demo__img__list">
          <img loading="lazy" src="/img/cup.jpg"></img>
          <img loading="lazy" src="/img/cup.jpg"></img>
          <img loading="lazy" src="/img/cup.jpg"></img>
          <img loading="lazy" src="/img/cup.jpg"></img>

        </div>
      </div>
      <div className="demo__option">
        <TextField label="name"></TextField>
        <div className="demo__option__color">
        <img loading="lazy" src="/img/cup.jpg"></img>
          <div>color</div>
          <div>color icon</div>
          <div className="demo__option__color__size">
            <Grid container spacing={2}>
              <Grid item spacing={1} md={12}>
                <TextField label="Size"></TextField>
                <TextField label="Quantity"></TextField>
                <Button>Xóa</Button>
                {/* <Button>Thêm</Button> */}
              </Grid>
              <Grid item md={12}>
                <TextField label="Size"></TextField>
                <TextField label="Quantity"></TextField>
                <Button>Xóa</Button>
                {/* <Button>Thêm</Button> */}
              </Grid>
              <Grid item md={12}>
                <TextField label="Size"></TextField>
                <TextField label="Quantity"></TextField>
                <Button>Xóa</Button>
                <Button>Thêm</Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Options;
