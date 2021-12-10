import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import "./newProduct.css";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    e.preventDefault();
    setCat(e.target.value.split(", "));
  };
  const handleSize = (e) => {
    e.preventDefault();
    setSize(e.target.value.split(", "));
  };
  const handleColor = (e) => {
    e.preventDefault();
    setColor(e.target.value.split(", "));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat, size: size, color: color };
          addProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="M, XL" onChange={handleSize} />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" placeholder="Black,Blue" onChange={handleColor} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
