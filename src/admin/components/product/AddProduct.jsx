import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, findProductsById } from "../../../state/product/Action";
import { getCategory } from "../../../state/category/Action";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
  const { products, category } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const preset_key = "ml_default";
  const cloud_name = "dq22msbw0";
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const [product, setProduct] = useState(null);

  const handleUploadCloundiry = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset_key);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const [files, setFiles] = useState([]);
  const [formColor, setFormColor] = useState([0]);
  const [colors, setColors] = useState([null]);

  const handleFiles = (event) => {
    const files = event.target.files;
    let imageUrls = [];
    for (let i = 0; i < files.length; i++) {
      console.log(i);
      imageUrls.push(files[i]);
    }
    setFiles(imageUrls);
  };

  const handleAddColor = () => {
    setFormColor([
      ...formColor, formColor.length
    ]);
    setColors([...colors, null])
  };

  const handleUploadColor = (event, id) => {
    const newColors = [...colors]
    newColors[id] = event.target.files[0]
    setColors(newColors);

  };

  const handleDeleteColor = () => {
    setFormColor(formColor.filter((_, index) => index != formColor.length - 1));
    setColors(colors.filter((_, index) => index != colors.length - 1));
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const request = {
      title: data.get("title"),
      category: JSON.parse(data.get("category")),
      listImageUrl: [],
      colors: [],
      price: Number(data.get("price")),
      discountPersent: Number(data.get("discountPersent")),
      totalQuantity: 0,
      description: data.get("desc"),
    };
    for (let i = 0; i < colors.length; i++) {
      const arr = data.getAll("sizes")[i].split(",");
      let sizeTmp = [];
      arr.forEach((element) => {
        sizeTmp.push({
          name: element,
          quantity: Number(data.getAll("quantity")[i]),
        });
      });

      const imageUrl = await handleUploadCloundiry(colors[i]);
      console.log("color", i);
      request.colors.push({
        imageUrl: imageUrl,
        name: data.getAll("colorName")[i],
        sizes: sizeTmp,
      });
    }
    for (let i = 0; i < files.length; i++) {
      const imageUrl = await handleUploadCloundiry(files[i]);
      console.log("file", i);
      request.listImageUrl.push(imageUrl);
    }
    request.colors.forEach((item) => {
      request.totalQuantity = item.sizes.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
    });
    localStorage.setItem("product", JSON.stringify(request));
    dispatch(createProduct(request));
    navigate("/admin/product");
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  // Lấy sản phẩm khi `param.productId` thay đổi
  useEffect(() => {
    if (param.productId) {
      setLoading(true);
      dispatch(findProductsById(param.productId));
    }
  }, [dispatch, param.productId]);

  // Cập nhật sản phẩm khi `products` thay đổi
  useEffect(() => {
    if (products && products.product) {
      setProduct(products.product);
      setLoading(false);
    } else {
      setProduct({
        title: "",
        category: [],
        listImageUrl: [],
        colors: [],
        price: 0,
        discountPersent: 0,
        totalQuantity: 0,
        description: "",
      });
    }
  }, [products]);

  return product ? (
    <div className="addProduct">
      <h2 className="admin--home--title">Thêm sản phẩm</h2>
      <div className="addProduct--content">
        <div className="layer"></div>
        <form method="POST" onSubmit={handleAddProduct}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <label style={{ fontSize: "18px" }}>Tên sản phẩm</label>
              <input
                type="text"
                name="title"
                placeholder="Tên sản phẩm"
                value={product.title}
                onChange={(event) =>
                  setProduct({ ...product, title: event.target.value })
                }
                required
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  fontSize: "14px",
                  border: "1px solid",
                }}
              ></input>
            </Grid>
            <Grid item xs={6}>
              <label style={{ fontSize: "18px" }}>Loại sản phẩm</label>
              <select
                name="category"
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  fontSize: "14px",
                  border: "1px solid",
                }}
              >
                {category.categories &&
                  category.categories.map((category) => (
                    <option
                      value={JSON.stringify(category)}
                      key={category.id}
                      onChange={(event) =>
                        setProduct({
                          ...product,
                          category: JSON.stringify(event.target.value),
                        })
                      }
                    >
                      {category.name}
                    </option>
                  ))}
              </select>
            </Grid>
            <Grid item xs={6}>
              <label style={{ fontSize: "18px" }}>Giá</label>
              <input
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  fontSize: "14px",
                  border: "1px solid",
                }}
                type="text"
                name="price"
                placeholder="Giá"
                value={product.price}
                onChange={(event) =>
                  setProduct({ ...product, price: event.target.value })
                }
                required
              ></input>
            </Grid>
            <Grid item xs={6}>
              <label style={{ fontSize: "18px" }}>Giảm giá</label>
              <input
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  fontSize: "14px",
                  border: "1px solid",
                }}
                type="text"
                name="discountPersent"
                placeholder="Giảm giá"
                value={product.discountPersent}
                onChange={(event) =>
                  setProduct({
                    ...product,
                    discountPersent: event.target.value,
                  })
                }
              ></input>
            </Grid>
            <Grid item xs={12}>
              <label style={{ fontSize: "18px" }}>Ảnh</label>
              <label
                htmlFor="file-image-upload"
                className="custom-file-product-upload"
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  border: "1px solid",
                }}
              >
                <span style={{ fontSize: "14px" }}>Chọn tệp</span>
                <span style={{ fontSize: "14px" }}>
                  {files.length === 0
                    ? "Chưa có tệp nào"
                    : `${files.length} tệp`}
                </span>
              </label>
              <input
                id="file-image-upload"
                type="file"
                multiple
                onChange={(event) => handleFiles(event)}
              ></input>
              <Grid container spacing={1}>
                {files.map((file, index) => (
                  <Grid item xs={1} key={index}>
                    <img loading="lazy"
                      className="img-fluid"
                      src={URL.createObjectURL(file)}
                      alt="imageUrl"
                    ></img>
                  </Grid>
                ))}
              </Grid>
            </Grid>
           

            {formColor.map((item, index) => (
              <Grid
                item
                xs={12}
                container
                spacing={1}
                key={item}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Grid item xs={0.8}>
                  <label htmlFor={`file-color-upload ${index}`} class="custom-file-upload">
                    <img loading="lazy"
                      className="img-fluid"
                      name="file-color-upload"

                      src={colors[index] == null ? "/img/color_Image.jpg" : URL.createObjectURL(colors[index])}
                    ></img>
                  </label>
                  <input
                    id={`file-color-upload ${index}`}
                    type="file"
                    name="colorImage"
                    onChange={(event) => handleUploadColor(event, index)}
                  />
                </Grid>
                <Grid item xs={11.2} container spacing={1}>
                  <Grid item xs={4}>
                    <label style={{ fontSize: "18px" }}>Màu sắc</label>
                    <input
                      type="text"
                      name="colorName"
                      style={{
                        borderRadius: "10px",
                        padding: "10px",
                        fontSize: "14px",
                        border: "1px solid",
                      }}
                    ></input>
                  </Grid>
                  <Grid item xs={4}>
                    <label style={{ fontSize: "18px" }}>Kích Thước</label>
                    <input
                      type="text"
                      name="sizes"
                      style={{
                        borderRadius: "10px",
                        padding: "10px",
                        fontSize: "14px",
                        border: "1px solid",
                      }}
                    ></input>
                  </Grid>
                  <Grid item xs={4}>
                    <label style={{ fontSize: "18px" }}>
                      Số lượng (mỗi size)
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      style={{
                        borderRadius: "10px",
                        padding: "10px",
                        fontSize: "14px",
                        border: "1px solid",
                      }}
                    ></input>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleAddColor}
                style={{ padding: "10px 18px", fontSize: "12px" }}
              >
                Thêm color
              </Button>
              <Button
                variant="outlined"
             
                onClick={handleDeleteColor}
                style={{ padding: "10px 18px", fontSize: "12px" }}
              >
                Xóa màu
              </Button>
            </Grid>
            <Grid item xs={12}>
              <label style={{ fontSize: "18px" }}>Mô tả</label>
              <textarea
                style={{ borderRadius: "10px" }}
                name="desc"
                value={product.description}
                onChange={(event) =>
                  setProduct({ ...product, description: event.target.value })
                }
              ></textarea>
            </Grid>
            <Grid item xs={12}>
              <button
                className="btn btn-primary"
                type="submit"
                style={{
                  padding: "10px 18px",
                  fontSize: "15px",
                  backgroundColor: "#1976d2",
                  borderRadius: "4px",
                }}
              >
                Thêm sản phẩm
              </button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  ) : (
    loading && <div>loading...</div>
  );
};

export default AddProduct;
