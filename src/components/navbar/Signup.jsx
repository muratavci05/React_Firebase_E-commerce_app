import React from "react";

const Signup = () => {
  return (
    <div className="container">
      <br></br>
      <br></br>
      <h1>Sign Up</h1>
      <hr></hr>
      <form className="form-group col-sm-3" autoComplete="off">
        <label>Full Name</label>
        <input type="text" className="form-control" required/>
        <br></br>
        <label>Email</label>
        <input type="email" className="form-control" required/>
        <br></br>
        <label>Password</label>
        <input type="password" className="form-control" required/>
        <br></br>
      </form>
    </div>
  );
};

export default Signup;
