import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoggingContext from "../contexts/LoggingContext";
import { placeOrderAction } from "../actions/actions";

const styles = {
  container: {
    minWidth: "100%",
    padding: "2px",
    borderStyle: "groove",
    alignItems: "center",
    position: "-webkit-sticky sticky",
  },
  containerBody: {
    minWidth: "100%",
    backgroundColor: "#fbfbfb",
    minHeight: "100px",
  },
  containerFooter: {
    minWidth: "100%",
    backgroundColor: "#efefef",
    minHeight: "50px",
  },
  content: {
    marginLeft: "3.5%",
    marginRight: "10%",
  },
  placeOrder:{
    color: 'white',
    background: 'black',
    borderStyle: 'solid',
    borderRadius: '7px',
    height: '54px',
    fontWeight: '900',
    padding: '8%'
  }
};

class TotalBox extends Component {
  static contextType = LoggingContext;

  handleplaceOrderAction = () => {
    this.props.placeOrderAction();
  };
  render() {
    let placeOrderButton = "",
      message = "";
   
    if (this.context.user && this.context.user.loggedIn)
      placeOrderButton = (
        <center>
          <button type="button" style={styles.placeOrder} onClick={this.handleplaceOrderAction}>
            Place Order
          </button>
        </center>
      );
    else {
      message = (
        <center>
          <p style={{ color: "red", fontWeight: "bolder" }}>
            --- Login To Place order ---{" "}
          </p>
        </center>
      );
    }
    return (
      <React.Fragment>
        <div style={styles.container}>
          <div style={styles.containerBody}>
            <div style={styles.content}>
              <h4>Total</h4>
              <h5>
                Items {this.props.cartCost} :
                <span style={{ float: "right" }}>${this.props.cartTotal}</span>
              </h5>
              <h5>
                Discount :
                <span style={{ float: "right" }}>
                  - ${this.props.discount}%
                </span>
              </h5>
              <h5>
                TypeDiscount :
                <span style={{ float: "right" }}>
                  - ${this.props.typeDiscount}%
                </span>
              </h5>
            </div>
          </div>

          <div style={styles.containerFooter}>
            <div style={styles.content}>
              <h4>
                Order Total
                <span style={{ float: "right" }}>
                  ${parseFloat(this.props.orderTotal).toFixed(2)}
                </span>
              </h4>
              {placeOrderButton}
            </div>
          </div>
          {message}
        </div>
      </React.Fragment>
    );
  }
}

TotalBox.propTypes = {
  cartCost: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  typeDiscount: PropTypes.number.isRequired,
  cartTotal: PropTypes.number.isRequired,
  orderTotal: PropTypes.number.isRequired,
  placeOrderAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state, dispatch) => {
  return {
    cartCost: state.cart.cartCost,
    discount: state.cart.discount,
    typeDiscount: state.cart.typeDiscount,
    cartTotal: state.cart.cartTotal,
    orderTotal: state.cart.orderTotal,
  };
};

export default connect(mapStateToProps, { placeOrderAction })(TotalBox);
