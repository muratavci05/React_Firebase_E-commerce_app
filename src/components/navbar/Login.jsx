import React, { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMesg] = useState("");
  const [successMsg, setSuccesMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    /* console.log("email :", email)
    console.log("password :", password) */
  };
  return (
    <div className="container">
      <br></br>
      <br></br>
      <h1>Login</h1>
      <hr></hr>
      <form
        onSubmit={handleLogin}
        className="form-group col-sm-4"
        autoComplete="off"
      >
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
            Don't have an account{" "}
            <Link to={"/signup"}>
              <span className="text-danger">SignUp</span>
            </Link>{" "}
            here
          </span>

          <button type="submit" className="btn btn-success btn-sm">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
