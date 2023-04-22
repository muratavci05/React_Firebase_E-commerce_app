import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <h4>
        <Link to={"signup"}>SIGN UP</Link> &nbsp;
        <Link to={"login"}>LOGIN</Link>
      </h4>
    </div>
  );
};

export default Navbar;
