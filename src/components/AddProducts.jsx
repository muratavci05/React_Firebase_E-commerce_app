import React, { useState } from "react";
import { storage,firestore } from "../config/Config";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccesMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImage = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile&&types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError("");
      } else {
        setImage(null);
        setImageError(
          "Please select a valid image file type (png, jpg or jpeg)"
        )
      }
    } else {
      console.log("please select your file");
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();
    /* console.log("title :",title)
      console.log("description :",description)
      console.log("price : ",price)
      console.log("image :",image) */

    const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
    uploadTask.on("state_changed",(snapshot) => {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log(progress);
      },
      (error) => setUploadError(error.message),
      () => {
        storage
          .ref("product-images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            firestore
              .collection('Products')
              .add({
                title,
                description,
                price: Number(price),
                url
              })
              .then(() => {
                setSuccesMsg("Product added successfully");
                setTitle("");
                setDescription("");
                setPrice("");
                document.getElementById("file").value = "";
                setImageError("");
                setUploadError("");
                setTimeout(() => {
                  setSuccesMsg("");
                }, 3000)
              }).catch((error) => setUploadError(error.message));
          });
      }
    );
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <h1>Add Products</h1>
      <hr />
      {successMsg && 
        <>
          <div className="success-msg">{successMsg}</div>
          <br />
        </>
      }

      <form
        onSubmit={handleAddProducts}
        autoComplete="off"
        className="form-group col-sm-4"
      >
        <label>Product Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="form-control"
          required
        />
        <br />
        <label>Product Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="form-control"
          required
        />
        <br />
        <label>Product Price</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          className="form-control"
          required
        />
        <br />
        <label>Upload Product Image</label>
        <input
          onChange={handleProductImage}
          type="file"
          id="file"
          className="form-control"
          required
        />
        <br />
        {imageError && 
          <>
            {" "}
            <br />
            <div className="error-msg">{imageError}</div>
          </>
        }
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="btn btn-success btn-md">
            SUBMIT
          </button>
        </div>
      </form>
      {uploadError && 
        <>
          {" "}
          <br />
          <div className="error-msg">{uploadError}</div>
        </>
      }
    </div>
  );
};

export default AddProducts;
