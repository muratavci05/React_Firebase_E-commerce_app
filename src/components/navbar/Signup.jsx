import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth,firestore,storage } from "../../config/Config";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccesMsg] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    /*  console.log("FullName:", fullName);
    console.log("Email:", email);
    console.log("Password:", password); */
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(credentials);
        firestore.collection("users").doc(credentials.user.uid).set({
          FullName: fullName,
          Email: email,
          Password: password
        }).then(()=>{
          setSuccesMsg("Signup Successfull. You will now get redirected to Login")
        })
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };
  return (
    <div className="container">
      <br></br>
      <br></br>
      <h1>Sign Up</h1>
      <hr></hr>
      <form
        onSubmit={handleSignUp}
        className="form-group col-sm-4"
        autoComplete="off"
      >
        <label>Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          className="form-control"
          required
        />
        <br></br>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          required
        />
        <br></br>
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          required
        />
        <br></br>
        <div className="btn-box">
          <span className="small">
            Already have an account{" "}
            <Link to={"/login"}>
              <span className="text-danger">Login</span>
            </Link>{" "}
            here
          </span>
          <button type="submit" className="btn btn-success btn-sm">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
