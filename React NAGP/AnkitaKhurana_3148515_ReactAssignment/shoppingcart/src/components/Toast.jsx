import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showToastFunction } from "../actions/actions";

const styles = {
  toast: {
    position: "absolute",
    top: "20%",
    left: "40%",
    textAlign: "center",
    lineHeight: 5,
    width: "auto",
    height: "80px",
    verticalAlign: "middle",
    zIndex: "1",
    background: "rgba(0, 153, 255, 0.69)",
    color: "#ffffff",
    border: "2px solid #026b9a",
    borderRadius: "20px",
    padding:'0.5%'
  },
};

class Toast extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.productName === "" ? (
          <React.Fragment></React.Fragment>
        ) : (
          <div style={styles.toast}>
            {this.props.productName} added to Cart!
          </div>
        )}
      </React.Fragment>
    );
  }
}

Toast.propTypes = {
  productName: PropTypes.string.isRequired,
  showToastFunction: PropTypes.func.isRequired,
};

const mapStateToProps = (state, dispatch) => {
  return {
    productName: state.cart.lastItemAdded,
    showToastFunction: () => dispatch(showToastFunction()),
  };
};

export default connect(mapStateToProps, {})(Toast);
