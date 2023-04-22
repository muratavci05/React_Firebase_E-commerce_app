import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { auth } from "../../config/Config";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };
  return (
    <div className="navbar-expand">
      <div className="navbar">
        <div className="leftside">
          <div className="logo-brand">
            <img src={logo} alt="logo" width="60" />
          </div>
        </div>
        <div className="rightside">
          {!user && 
            <>
              <div>
                <Link className="navlink " to="signup">
                  SIGN UP
                </Link>
              </div>
              <div>
                <Link className="navlink" to="login">
                  LOGIN
                </Link>
              </div>
            </>
          }
          {user && 
            <>
              <div>
                <Link className="navlink" to="/">
                  {user}
                </Link>
              </div>
              <div className="cart-menu-btn">
                <Link className="navlink" to="/cart">
                  <Icon icon={shoppingCart} size={20} />
                </Link>
                {/* <span className="cart-indicator">{totalQty}</span> */}
              </div>
              <div className="btn btn-danger btn-md" onClick={handleLogout}>
                LOGOUT
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
