import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Product from "../components/Product";
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
  console.log("kullanıcı", user);
  return (
    <>
      <Navbar user={user} />
      <Product />
    </>
  );
};

export default Home;
