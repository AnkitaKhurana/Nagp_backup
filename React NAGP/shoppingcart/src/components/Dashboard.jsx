import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Cart from "./Cart";
import Product from "./Product";
import Login from "./Login";
import Catalog from "./Catalog";
import Toast from "./Toast";
import OrderPlacedDialogox from "./OrderPlacedDialogBox";
import PropTypes from "prop-types";
import Button from "./common/Button";
import { connect } from "react-redux";
import { LoggingProvider } from "../contexts/LoggingContext";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: "", password: "", loggedIn: false },
    };
  }
  componentDidMount() {
    if (localStorage.getItem("user") !== undefined) {
      this.setState({ user: JSON.parse(localStorage.getItem("user")) });
    }
  }

  setUser = (userNew) => {
    this.setState({ user: userNew });
    localStorage.setItem("user", JSON.stringify(userNew));
  };
  render() {
    let button = "",
      total = "";
    if (this.props.enabled)
      button = <Button name="Go To Cart" status={this.props.enabled} />;
    if (this.props.cartCost > 0)
      total = (
        <span style={{ float: "right", fontSize: "25px" }}>
          {" "}
          &nbsp; ( {this.props.cartCost} )
        </span>
      );
    return (
      <LoggingProvider value={{ user: this.state.user, setUser: this.setUser }}>
        <React.Fragment>
          <Router>
            <Header />
            <br></br>
            <br></br>
            <React.Fragment>
              <div style={{ marginRight: "10%", marginBottom: "1%" }}>
                {total}
                {button}
              </div>
            </React.Fragment>
            <OrderPlacedDialogox />
            <Toast />
            <Route exact path="/(catalog|)/" component={Catalog} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/product/:id" component={Product} />
          </Router>
          <Footer />
        </React.Fragment>
      </LoggingProvider>
    );
  }
}
Dashboard.propTypes = {
  res: PropTypes.object,
  cartCost: PropTypes.number.isRequired,
  enabled: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    enabled: Object.entries(state.cart.cartItems).length > 0 ? 1 : 0,
    cartCost: state.cart.cartCost,
  };
};

export default connect(mapStateToProps, {})(Dashboard);
