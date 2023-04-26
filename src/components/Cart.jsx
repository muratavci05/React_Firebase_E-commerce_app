import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { auth, firestore } from "../config/Config";

import StripeCheckout from "react-stripe-checkout";

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

  // getting the gty from cartProducts in a seperate array
  const gty = cartProducts.map((cartProduct) => {
    return cartProduct.gty;
  });

  // reducing the gty in a single value
  const reducerOfQty = (accumulator, currentValue) =>
    accumulator + currentValue;
  const totalQty = gty.reduce(reducerOfQty, 0);
  //console.log(totalQty);

  // gettin the TotalProductPrice from cartProducts in a seperate array
  const price = cartProducts.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  });
  // reducing the price in a single value
  const reducerOfPrice = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalPrice = price.reduce(reducerOfPrice, 0);

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

  // state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  // getting cart products
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        firestore.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const gty = snapshot.docs.length;
          setTotalProducts(gty);
        });
      }
    });
  }, []);

  // charging payment
  const handleToken = (token) => {
    console.log(token);
  };

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />
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
          <div className="summary-box">
            <h5>Cart Summary</h5>
           <br/>
            <div>
              Total No of Products: <span>{totalQty}</span>
            </div>
            <div>
              Total Price to Pay: <span>$ {totalPrice}</span>
            </div>
           <br/>
            <StripeCheckout
              stripeKey="pk_test_51N142SLBmYGXNvnxVIzSAeQQzvx2RZrNpUuvM2lS6rRGhdJWbpMxdFgUSDwVtLsziDFftKQr3QVmIR7DkTliDSji00ArbNgHqz"
              token={handleToken}
              billingAddress
              shippingAddress
              name="All Products"
              amount={totalPrice * 100}
            ></StripeCheckout>
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
