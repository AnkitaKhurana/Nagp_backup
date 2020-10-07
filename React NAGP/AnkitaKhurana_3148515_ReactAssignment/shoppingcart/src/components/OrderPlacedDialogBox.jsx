import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const styles = {
  toast: {
    position: "absolute",
    top: "30%",
    left: "50%",
    width: "11em",
    height: "2em",
    marginTop: "-5em",
    marginLeft: "-5em",
    border: "2px solid black",
    zIndex: "100",
    background: "rgb(20, 198, 255)",
    color: "white",
    padding: "1px",
  },
  modal: {
    position: "fixed" /* Stay in place */,
    zIndex: 1 /* Sit on top */,
    paddingTop: "100px" /* Location of the box */,
    left: 0,
    top: 0,
    width: "100%" /* Full width */,
    height: "100%" /* Full height */,
    overflow: "auto" /* Enable scroll if needed */,
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },

  /* Modal Content */
  modalContent: {
    backgroundColor: "#fefefe",
    margin: "auto",
    padding: "20px",
    border: "1px solid #888",
    width: "80%",
  },
};

class OrderPlacedDialogox extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.show ? (
          <React.Fragment>
            <div id="myModal" style={styles.modal}>
              <div style={styles.modalContent}>
                <h2>Order Placed</h2>
                <div
                  style={{ textAlign: "center", backgroundColor: "#eaeaea" }}
                >
                  <p>
                    Order Id : {Math.floor(Math.random() * Math.floor(100))}
                  </p>
                  <p>Items : {this.props.cartCost}</p>
                  <p>Order Total: ${parseFloat(this.props.orderTotal).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

OrderPlacedDialogox.propTypes = {
  show: PropTypes.bool.isRequired,
  cartCost: PropTypes.number.isRequired,
  orderTotal: PropTypes.number.isRequired,
};

const mapStateToProps = (state, dispatch) => {
  return {
    show: state.cart.showDialogBox,
    cartCost: state.cart.cartCost,
    orderTotal: state.cart.orderTotal,
  };
};

export default connect(mapStateToProps, {})(OrderPlacedDialogox);
