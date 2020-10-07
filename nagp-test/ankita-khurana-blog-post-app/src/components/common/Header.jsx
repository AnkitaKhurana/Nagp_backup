import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/" style={{ textDecoration: "none" }} >
          <h1
            style={{
              textAlign: "center",
              color: "white",
              marginTop: "0px",
              backgroundColor: "#000000",
            }}
          >
            <span> Blogging Website</span>
          </h1>
        </Link>
      </React.Fragment>
    );
  }
}

export default Header;
