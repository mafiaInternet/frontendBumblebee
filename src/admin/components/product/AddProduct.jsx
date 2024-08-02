import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../state/product/Action";

const styles = {
  label: {
    display: "flex",
    alignItems: "center",
  },
};

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [colors, setColors] = useState([]);
  const [quantity, setQuantity] = useState();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: null,
    price: null,
    discountedPrice: null,
    discountedPersent: null,
    category: null,
    totalQuantity: null,
    description: null,
    colors: [
      {
        imageUrl: null,
        name: null,
        sizes: [],
      },
    ],
    listImageUrl: [],
  });

  console.log(data);
  const [colorData, setColorData] = useState([]);

  const { getRootProps: getRootImage, getInputProps: getInputImage } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles) => {
        setFiles((prevFiles) => [
          ...prevFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ]);
      },
    });

  const {
    getRootProps: getRootColor,
    getInputProps: getInputColor,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setColors((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  const handleRemoveItem = (file) => {
    // URL.revokeObjectURL(file.preview);
    setColors((prevFiles) => prevFiles.filter((f) => f !== file));
  };
  console.log(colors);

  function handleClick() {
    colors.forEach((color) => {
      setColorData([
        ...colorData,
        {
          imageUrl: color.preview,
          name: color.name,
          sizes: sizeType ? sizeOfStrings : sizeOfNumbers,
        },
      ]);
    });
  }

 

  const handleCreateProduct = (event) => {
    const data = new FormData(event.currentTarget);
    const demo = [];
    const sizes = [];
    const listImageUrl = [];
    files.forEach((file) => {
      listImageUrl.push(file.preview);
    });

    {
      sizeType
        ? sizeOfStrings.forEach((size) => {
            sizes.push({ name: size.label, quantity: data.get("quantity") });
          })
        : sizeOfNumbers.forEach((size) => {
            sizes.push({ name: size.label, quantity: 10 });
          });
    }

    colors.forEach((color) => {
      demo.push({ imageUrl: color.preview, name: color.name, sizes: sizes });
    });

    setColorData(demo);
    const totalQuantity =
      colors.length *
      (sizeType ? sizeOfStrings.length : sizeOfNumbers.length) *
      quantity;
    setTotalQuantity(totalQuantity)

    event.preventDefault();

    const productData = {
      title: data.get("title"),
      price: data.get("price"),
      discountedPrice: data.get("discountedPrice"),
      discountedPersent: data.get("discountedPersent"),
      category: data.get("category"),
      totalQuantity: totalQuantity,
      description: data.get("description"),
      colors: demo,
      listImageUrl: ["/img/anh-trang-hinh-nen-avatar-trang-tinh-dep-14.jpg"],
    };

    console.log(productData);
    localStorage.setItem("product", JSON.stringify(productData))
    dispatch(createProduct(productData))
  };
  const thumbs = files.map((file) => (
    <div key={file.name}>
      <img
        className="img-fluid"
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />

     
    </div>
  ));

  const co = colors.map((color, index) => (
    <Grid item xs={1.2}>
    <div className="demo__option__color__img" key={color.name}>
      <img
        className="img-fluid"
        src={color.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(color.preview);
        }}
      />
      <span onClick={() => handleRemoveItem(color)}>x</span>
    </div>
    </Grid>
  ));

  const [sizeType, setSizeType] = useState(true);
  const handleSizeType = (event) => {
    const type = event.target;
    console.log(type);
    if (type.includes("CHỮ")) {
      setSizeType(true);
    } else {
      setSizeType(false);
    }
  };


  const demo = (event) => {
    const data = new FormData(event.currentTarget);
  }
  const sizeOfNumbers = [
    { id: 29, label: "29" },
    { id: 30, label: "30" },
    { id: 31, label: "31" },
    { id: 32, label: "32" },
    { id: 33, label: "33" },
    { id: 34, label: "34" },
    { id: 35, label: "35" },
    { id: 36, label: "36" },
    { id: 37, label: "37" },
  ];

  const sizeOfStrings = [
    { id: 1, label: "XS" },
    { id: 2, label: "S" },
    { id: 3, label: "M" },
    { id: 4, label: "L" },
    { id: 5, label: "XL" },
    { id: 6, label: "XXL" },
  ];
  const [totalQuantity, setTotalQuantity] = useState(0)
  useEffect(() => {
    setTotalQuantity(colors.length *
      (sizeType ? sizeOfStrings.length : sizeOfNumbers.length) *
      quantity)
  }, [quantity, setQuantity])
 

  return (
    <div className="demo">
      <form method="POST" onSubmit={handleCreateProduct}>
        <div className="demo__image">
          <Carousel
            showArrows={false}
            swipeable={true}
            infiniteLoop={true}
            emulateTouch={true}
            showIndicators={false}
            dynamicHeight={true}
          >
            {thumbs}

            <div {...getRootImage({ className: "dropzone" })}>
              <input {...getInputImage()} />
              <img
                className="img-fluid"
                src="/img/anh-trang-hinh-nen-avatar-trang-tinh-dep-14.jpg"
              />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </Carousel>
        </div>
        <div className="demo__option">
          <h3>Thông tin sản phẩm</h3>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Tên sản phẩm"
                name="title"
                value={data.title}
                pattern="[0-9]"
                onChange={(event) =>
                  setData({ ...data, title: event.target.value })
                }
                fullWidth
                required
              ></TextField>
              <input type="text" pattern="[a-zA-Z0-9]"></input>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Giá"
                name="price"
                value={data.price}
                pattern="[a-zA-Z0-9]"
                onChange={(event) =>
                  setData({ ...data, price: Number(event.target.value) })
                }
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Giảm giá"
                name="discountedPrice"
                value={data.discountedPrice}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Phần trăm giảm giá"
                name="discountedPersent"
                value={data.discountedPersent}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Thể loại"
                name="category"
                fullWidth
                required
              ></TextField>
            </Grid>
            <p>Màu sắc</p>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {co}
                <Grid item xs={1.2}>
                  <div
                    {...getRootColor({
                      className: "dropzone demo__option__color",
                    })}
                  >
                    <input {...getInputColor()} />
                    <AddIcon></AddIcon>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <TextField label="Name's Color" fullWidth></TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Số lượng"
                name="quantity"
                onChange={(event) => setQuantity(Number(event.target.value))}
                fullWidth
              ></TextField>
            </Grid>
            <p>Kiểu size</p>
            <Grid item xs={12}>
              <Button
                variant={sizeType ? "contained" : "outlined"}
                sx={{ marginRight: "1rem" }}
                onClick={() => setSizeType(true)}
              >
                Chữ
              </Button>
              <Button
                variant={!sizeType ? "contained" : "outlined"}
                onClick={() => setSizeType(false)}
              >
                Số
              </Button>
            </Grid>

            <Grid container item xs={12}>
              {sizeType
                ? sizeOfStrings.map((item) => (
                    <Button
                      key={item.id}
                      // onClick={() => handleItemClick(item.label)}
                      // variant={
                      //   selectedItems.some((size) => size.name === item.label) && selectedItems.some((size) => size.sizeId === selected) ? "contained" : "outlined"
                      // }
                      // className={
                      //   selectedItems.some((size) => size.name === item.label) && selectedItems.some((size) => size.sizeId === selected) ? "selected" : ""
                      // }
                    >
                      {item.label}
                    </Button>
                  ))
                : sizeOfNumbers.map((item) => (
                    <Button
                      key={item.id}
                      // onClick={() => handleItemClick(item.label)}
                      // variant={
                      //   selectedItems.includes(item.label) ? "contained" : "outlined"
                      // }
                      // className={
                      //   selectedItems.includes(item.label) ? "selected" : ""
                      // }
                    >
                      {item.label}
                    </Button>
                  ))}
            </Grid>
            <Grid sx={{display: "flex", justifyContent: "space-between"}} item xs={12}>
            <div className="total-quantity">
              <p>Tổng số lượng: {totalQuantity}</p>
            </div>
              <Button type="submit" variant="contained" sx={{ float: "right" }}>
                Thêm sản phẩm
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
