import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  addToCartAction,
  reduceFromCartAction,
  deleteFromCartAction,
  showToastFunction,
} from "../actions/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TotalBox from "./TotalBox";

const styles = {
  listArea: {
    width: "80%",
    margin: "auto",
  },
  head: {
    fontSize: "larger",
    fontFamily: "initial",
    color: "#4c4848",
    display: "inline-block",
  },
  leftPanel: {
    minWidth: "70%",
    display: "inline-flex",
  },
  rightPanel: {
    minWidth: "30%",
    display: "inline-flex",
  },
  label: {
    display: "inline",
    marginLeft: "22%",
  },
  tab: {
    textAlign: "center",
    border: "2.5px groove",
    margin: "2px",
  },
  cross:{
    float: "right",
    lineHeight: 1.5,
    verticalAlign: "middle",
    borderRadius: '40px',
    borderStyle: 'none',
    backgroundColor: '#ff0000',
    color: 'white'
  },
  plus:{
    float:'right',
    background: 'green',
    color: 'white',
    border: 'solid',
    borderColor: 'green',
    borderRadius: '6px'
  },
  minus:{
    float:'left',
    background: 'green',
    color: 'white',
    border: 'solid',
    borderColor: 'green',
    borderRadius: '6px'
  }
};

class Cart extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleReduceFromCart = this.handleReduceFromCart.bind(this);
  }
  handleDeleteFromCart(e) {
    let p = this.props.products[e.target.getAttribute("product")];
    this.props.deleteFromCartAction({
      product: p,
    });
  }
  handleAddToCart(e) {
    let p = this.props.products[e.target.getAttribute("product")];
    this.props.addToCartAction({
      product: p,
    });
    this.props.showToastFunction();
  }
  handleReduceFromCart(e) {
    let p = this.props.products[e.target.getAttribute("product")];
    this.props.reduceFromCartAction({
      product: p,
    });
  }
  render() {
    return (
      <div style={styles.listArea}>
        <Link to="/">
          <p component={Link}>Back</p>
        </Link>
        <div style={styles.head}>Order Summary</div>
        <hr></hr>
        {this.props.show ? (
          <React.Fragment>
            <div style={styles.leftPanel}>
              {Object.keys(this.props.res).length > 0 ? (
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>ITEMS ({this.props.cartCost})</th>
                      <th>QUANTITY</th>
                      <th>PRICE</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.keys(this.props.res).map((item, i) => (
                      <tr product={item} key={i}>
                        <td style={styles.tab}>
                          <img
                            style={{
                              maxWidth: "50px",
                              height: "auto",
                              float: "left",
                            }}
                            src={this.props.products[item].img_url}
                            alt="Product"
                          />
                          <span>
                          {this.props.products[item].name}</span>
                          <button
                            style={styles.cross}
                            product={item}
                            onClick={this.handleDeleteFromCart.bind(item)}
                          >
                            X
                          </button>
                        </td>
                        <td style={{ width: "15%" }}>
                          <button
                            style={styles.minus}
                            product={item}
                            onClick={this.handleReduceFromCart.bind(item)}
                          >
                            -
                          </button>
                          <div style={styles.label}>{this.props.res[item]}</div>
                          <button
                            style={styles.plus}
                            product={item}
                            onClick={this.handleAddToCart.bind(item)}
                          >
                            +
                          </button>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          $
                          {parseFloat(this.props.res[item] *
                            (this.props.products[item].price -
                              (this.props.products[item].price *
                                this.props.products[item].discount) /
                                100)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <Link to="/">
                  {" "}
                  <p component={Link}>
                    No Items in the cart right, continue shopping!
                  </p>
                </Link>
              )}
            </div>
            {Object.keys(this.props.res).length > 0 ? (
              <div style={styles.rightPanel}>
                <TotalBox />
              </div>
            ) : (
              ""
            )}
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}

Cart.propTypes = {
  res: PropTypes.object,
  show: PropTypes.bool.isRequired,
  products: PropTypes.object,
  addToCartAction: PropTypes.func.isRequired,
  cartCost: PropTypes.number.isRequired,
  reduceFromCartAction: PropTypes.func.isRequired,
  deleteFromCartAction: PropTypes.func.isRequired,
  showToastFunction: PropTypes.func.isRequired,
};

const mapStateToProps = (state, dispatch) => {
  return {
    res: state.cart.cartItems,
    show: !state.cart.showDialogBox,
    products: state.product.products,
    cartCost: state.cart.cartCost,
    reduceFromCartAction: (details) => dispatch(reduceFromCartAction(details)),
    addToCartAction: (details) => dispatch(addToCartAction(details)),
    deleteFromCartAction: (details) => dispatch(deleteFromCartAction(details)),
    showToastFunction: () => dispatch(showToastFunction()),
  };
};

export default connect(mapStateToProps, {
  addToCartAction,
  reduceFromCartAction,
  deleteFromCartAction,
  showToastFunction,
})(Cart);
