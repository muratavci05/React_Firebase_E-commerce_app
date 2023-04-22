import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"

const Navbar = () => {
  return (
    <div className="navbar-expand">
    <div className="navbar">
      <div className="leftside">
        <div className="logo-brand"> 
          <img src={logo} alt="logo" width="60"/>
         </div>
         </div>
         <div className="rightside">
        
        <div><Link className="navlink text-primary" to={"signup"}>SIGN UP</Link></div>
        <div><Link className="navlink text-primary" to={"login"}>LOGIN</Link></div>
    
         
        
      
      
      </div>
     
    </div>
    </div>
  );
};

export default Navbar;
