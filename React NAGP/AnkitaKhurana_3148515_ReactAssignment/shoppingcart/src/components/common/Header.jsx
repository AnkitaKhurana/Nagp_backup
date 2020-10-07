import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoggingContext from "../../contexts/LoggingContext";
import { LoggingConsumer } from "../../contexts/LoggingContext";
import LogoutButton from "./LogoutButton";

const styles = {
  loginButton: {
    borderWidth: "7px",
    borderStyle: "solid",
    cursor: "pointer",
    borderColor: '#a3f598',
    backgroundColor: '#4aec3482'
  },
};

class Header extends Component {
  static contextType = LoggingContext;
  render() {
    let loginButton = "";
    let logoutButton = "";

    if(this.context.user)
    {
      if (!this.context.user.loggedIn)
      loginButton = (
        <Link to="/login" style={{ float: "right" }}>
          <button style={styles.loginButton} type="button">
            Login
          </button>
        </Link>
      );
      if (this.context.user.loggedIn) logoutButton = <LogoutButton />;

    }
    else{
      loginButton = (
        <Link to="/login" style={{ float: "right" }}>
          <button style={styles.loginButton} type="button">
            Login
          </button>
        </Link>
      );
    }
   

    return (
      <LoggingConsumer>
        {(value) => {
          return (
            <React.Fragment>
              <Link to="/">
              <h1
                style={{
                  textAlign: "center",
                  color: "white",
                  marginTop: "0px",
                  backgroundColor: "#000000",
                }}
              >
                MOBILE ONLINE STORE
              </h1>
              </Link>
              <React.Fragment>
                <div style={{ marginRight: "10%" }}>
                  {loginButton}
                  {logoutButton}
                </div>
              </React.Fragment>
            </React.Fragment>
          );
        }}
      </LoggingConsumer>
    );
  }
}

export default Header;
