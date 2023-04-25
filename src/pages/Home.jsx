import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Products from "../components/Products";
import { auth, firestore } from "../config/Config";

const Home = () => {
  //getting current user function

  function GetCurrentUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          firestore
            .collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const user = GetCurrentUser();
  //console.log("kullanıcı", user);

  // state of products

  const [products, setProducts] = useState([]);

  // getting products function
  const getProducts = async () => {
    const products = await firestore.collection("Products").get();
    const productsArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };
  useEffect(()=>{
    getProducts();
  },[])
  return (
    <>
      <Navbar user={user} />
      <br/>
      {products.length > 0 && (
          <div className="container-fluid">
              <h1 className="text-center">Products</h1>
              <div className="products-box">
                <Products products={products}/>
              </div>
          </div>
        )
      }
      {products.length < 1 && (
          <div className="container-fluid">Please wait ....</div>
        )
      }
    </>
  );
};

export default Home;
