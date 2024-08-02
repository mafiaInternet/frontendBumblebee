import { Button, Grid } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "./AddProduct";
import { addProduct } from "../../state/action/ProductAction";
import { createProduct } from "../../../state/product/Action";
import { getCategory } from "../../../state/category/Action";
import axios from "axios";

const Demo = () => {
  const dispatch = useDispatch();
  const preset_key = "ml_default"
  const cloud_name = "dq22msbw0"
  const [image, setImage] = useState()

  const handleFile = async(image) => {
    console.log(image)
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', preset_key)
 
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      setImage(res.data.secure_url)
      return res.data.secure_url
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }

  }
  const { category } = useSelector((store) => store);
  const [files, setFiles] = useState([]);
  const [formColor, setFormColor] = useState([]);
  const [colors, setColors] = useState([]);
  const handleFiles = (event) => {
    const imageUrls = event.target.files;
    for (let i = 0; i < imageUrls.length; i++) {
      setFiles([...files, URL.createObjectURL(imageUrls[i])]);
    }
  };

  const handleAddColor = () => {
    setFormColor([
      ...formColor,
      <Grid item xs={12} container spacing={1}>
        <Grid item xs={0.8}>
          <label for="file-upload" class="custom-file-upload">
            <img className="img-fluid" src="/img/color_Image.jpg"></img>
          </label>
          <input
            id="file-upload"
            type="file"
            name="colorImage"
            onChange={handleUploadColor}
          />
        </Grid>
        <Grid item xs={11.2} container spacing={1}>
          <Grid item xs={4}>
            <label>Màu sắc</label>
            <input type="text" name="colorName"></input>
          </Grid>
          <Grid item xs={4}>
            <label>Kích Thước</label>
            <input type="text" name="sizes"></input>
          </Grid>
          <Grid item xs={4}>
            <label>Số lượng (mỗi size)</label>
            <input type="text" name="quantity"></input>
          </Grid>
        </Grid>
      </Grid>,
    ]);
  };

  const handleUploadColor = (event) => {
    setColors([...colors, event.target.files[0]])
    // setColors([...colors, URL.createObjectURL(event.target.files[0])]);
  };

  const handleDeleteColor = () => {
    let [, ...newFormColor] = formColor;
    setFormColor(newFormColor);
    console.log(formColor);
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let colordemo = [];
    for (let i = 0; i < colors.length; i++) {
      const arr = data.getAll("sizes")[i].split(",");
      let sizeTmp = [];
      arr.forEach((element) => {
        sizeTmp.push({
          name: element,
          quantity: Number(data.getAll("quantity")[i]),
        });
      });

      const imageUrl = await handleFile(colors[i]);
      // await handleFile(colors[i])
      colordemo.push({
        imageUrl: imageUrl,
        name: data.getAll("colorName")[i],
        sizes: sizeTmp,
      });
    }

    let totalQuantity = 0
    colordemo.forEach((item) => {
      totalQuantity = item.sizes.reduce((acc, curr) => acc + curr.quantity, 0);
    });
    

    const request = {
      title: data.get("title"),
      category: JSON.parse(data.get("category")),
      listImageUrl: files,
      colors: colordemo,
      price: Number(data.get("price")),
      discountPersent: Number(data.get("discountPersent")),
      totalQuantity: totalQuantity,
      description: data.get("desc"),
    };
    console.log(JSON.parse(data.get("category")));
    console.log(request);
    localStorage.setItem("product", JSON.stringify(request))

    // dispatch(createProduct(request))
  };

  console.log(category);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <div className="addProduct">
      <h2 className="addProduct--title">Thêm sản phẩm</h2>
      <div className="addProduct--content">
        <div className="layer"></div>
        <form method="POST" onSubmit={handleAddProduct}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <label>Tên sản phẩm*</label>
              <input
                type="text"
                name="title"
                placeholder="Tên sản phẩm"
                required
              ></input>
            </Grid>
            <Grid item xs={6}>
              <label>Loại sản phẩm*</label>
              <select name="category">
              <option value={JSON.stringify({id: 1, name: 'Áo thun', name_id: "ao-thun"})}>Áo thun</option>
                {category.categories &&
                  category.categories.map((category) => (
                    <option value={JSON.stringify(category)} >{category.name}</option>
                  ))}

              </select>
            </Grid>
            <Grid item xs={6}>
              <label>Giá</label>
              <input
                type="text"
                name="price"
                placeholder="Giá"
                required
              ></input>
            </Grid>
            <Grid item xs={6}>
              <label>Giảm giá</label>
              <input
                type="text"
                name="discountPersent"
                placeholder="Giảm giá"
              ></input>
            </Grid>
            <Grid item xs={12}>
              <label>Ảnh</label>
              <label
                for="file-image-upload"
                className="custom-file-product-upload"
              >
                <span>Chọn tệp</span>
                <span>
                  {files.length === 0
                    ? "Chưa có tệp nào"
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
            {colors.map((color) => (
              <Grid
                item
                xs={12}
                container
                spacing={1}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Grid item xs={0.8}>
                  <label for="file-color-upload" class="custom-file-upload">
                    <img className="img-fluid" src={URL.createObjectURL(color)}></img>
                  </label>
                  <input
                    id="file-color-upload"
                    type="file"
                    name="colorImage"
                    onChange={handleUploadColor}
                  />
                </Grid>
                <Grid item xs={11.2} container spacing={1}>
                  <Grid item xs={4}>
                    <label>a</label>
                    <input type="text" name="colorName"></input>
                  </Grid>
                  <Grid item xs={4}>
                    <label>Kích Thước</label>
                    <input type="text" name="sizes"></input>
                  </Grid>
                  <Grid item xs={4}>
                    <label>Số lượng (mỗi size)</label>
                    <input type="text" name="quantity"></input>
                  </Grid>
                </Grid>
              </Grid>
            ))}

            {formColor.map((item) => item)}

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="error"
                onClick={handleAddColor}
              >
                Thêm color
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteColor}
              >
                Xóa màu
              </Button>
            </Grid>
            <Grid item xs={12}>
              <label>Mô tả</label>
              <textarea name="desc"></textarea>
            </Grid>
            <Grid item xs={12}>
              <button className="btn btn-danger" type="submit">
                Thêm sản phẩm
              </button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default Demo;
