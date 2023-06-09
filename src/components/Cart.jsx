import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { auth, firestore } from "../config/Config";

import StripeCheckout from "react-stripe-checkout";

import CartProducts from "./CartProducts";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "./Modal"


const Cart = () => {
  const navigate = useNavigate();
  //getting current user function

   // show modal state
   const [showModal, setShowModal]=useState(false);

   // trigger modal
   const triggerModal=()=>{
       setShowModal(true);
   }

   // hide modal
   const hideModal=()=>{
       setShowModal(false);
   }

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
  const handleToken = async(token) => {
    // console.log(token);
    const cart = { name: "All Products", totalPrice };
    const response = await axios.post("http://localhost:8080/checkout", {
      token,
      cart,
    });

    console.log(response);


    let { status } = response.data;
    console.log(status)
    if (status === "success") {
      navigate("/");
      toast.success("Your order has been placed successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
        const uid = auth.currentUser.uid;
        const carts= await firestore.collection("Cart " + uid).get();
        for(var snap of carts.docs){
          firestore.collection("Cart " + uid).doc(snap.id).delete();
        }
    } else {
      alert("Something went wrong in checkout");
    }
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
            <br />
            <div>
              Total No of Products: <span>{totalQty}</span>
            </div>
            <div>
              Total Price to Pay: <span>$ {totalPrice}</span>
            </div>
            <br />
            <StripeCheckout
              stripeKey="pk_test_51N142SLBmYGXNvnxVIzSAeQQzvx2RZrNpUuvM2lS6rRGhdJWbpMxdFgUSDwVtLsziDFftKQr3QVmIR7DkTliDSji00ArbNgHqz"
              token={handleToken}
              billingAddress
              shippingAddress
              name="All Products"
              amount={totalPrice * 100}
            ></StripeCheckout>
            <h6 className='text-center'
                        style={{marginTop: 7+'px'}}>OR</h6>
                        <button className='btn btn-secondary btn-md' 
                        onClick={()=>triggerModal()}>Cash on Delivery</button>                
          </div>
        </div>
      )}
      {cartProducts.length < 1 && (
        <div className="container-fluid">No products to show</div>
      )}
      {showModal===true&&(
                <Modal TotalPrice={totalPrice} totalQty={totalQty}
                    hideModal={hideModal}
                />
            )}          
    </>
  );
};

export default Cart;
