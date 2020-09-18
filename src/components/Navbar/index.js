import React from "react";
import Logo from "../../assets/images/logo.png";

function Navbar({ modal }) {
  return (
    <div className="navbar">
      <img className="logo" src={Logo} alt="" />
      <div className="navbar__login">
        <button onClick={() => modal(true)}>Login</button>
      </div>
    </div>
  );
}

export default Navbar;
