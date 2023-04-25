import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { auth, firestore } from "../config/Config";

import CartProducts from "./CartProducts";

const Cart = () => {
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

  // state of cart products
  const [cartProducts, setCartProducts] = useState([]);

  // getting cart products from firestore collection and updating the state
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        firestore.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProduct);
        });
      } else {
        console.log("user is not signed in to retrieve cart");
      }
    });
  }, []);

  // console.log(cartProducts)

  // global variable
  let Product;

  // cart product increase function
  const cartProductIncrease = (cartProduct) => {
    // console.log(cartProduct)
    Product = cartProduct;
    Product.gty = Product.gty + 1;
    Product.TotalProductPrice = Product.gty * Product.price;
    // updating in database
    auth.onAuthStateChanged((user) => {
      if (user) {
        firestore
          .collection("Cart " + user.uid)
          .doc(cartProduct.ID)
          .update(Product)
          .then(() => {
            console.log("increment added");
          });
      } else {
        console.log("user is not logged in to increment");
      }
    });
  };

  //cart product decrease functionality
  const cartProductDecrease = (cartProduct) => {
    Product = cartProduct;
    if (Product.gty > 1) {
      Product.gty = Product.gty - 1;
      Product.TotalProductPrice = Product.gty * Product.price;
      // updating in database
      auth.onAuthStateChanged((user) => {
        if (user) {
          firestore
            .collection("Cart " + user.uid)
            .doc(cartProduct.ID)
            .update(Product)
            .then(() => {
              console.log("decrement ");
            });
        } else {
          console.log("user is not logged in to decrement");
        }
      });
    }
  };

  return (
    <>
      <Navbar user={user} />
      <br />
      {cartProducts.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Cart</h1>
          <div className="products-box">
            <CartProducts
              cartProducts={cartProducts}
              cartProductIncrease={cartProductIncrease}
              cartProductDecrease={cartProductDecrease}
            />
          </div>
        </div>
      )}
      {cartProducts.length < 1 && (
        <div className="container-fluid">No products to show</div>
      )}
    </>
  );
};

export default Cart;
