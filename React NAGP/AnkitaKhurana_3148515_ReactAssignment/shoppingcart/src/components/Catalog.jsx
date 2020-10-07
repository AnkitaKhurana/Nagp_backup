import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchProductsAction,
  fetchProductsReal,
  fetchProductsActionWithoutPaginationAction,
} from "../actions/actions";
import Card from "./common/Card";
import SearchBox from "./SearchBox";
import PaginationBox from "./PaginationBox";

const styles = {
  catalog: {
    width: "80%",
    margin: "auto",
    paddingTop: "5%",
  },
  head: {
    fontSize: "larger",
    fontFamily: "initial",
    color: "#4c4848",
    display: "inline-block",
  },
};

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", sort: "", page: 1, limit: 4 };
  }
  handleChange = (e) => {
    if (e.target.name === "page") {
      this.setState({ [e.target.name]: e.target.value }, () => {
        this.props.fetchProductsAction(
          this.state.value,
          this.state.sort,
          this.state.page,
          this.state.limit
        );
        this.props.fetchProductsActionWithoutPaginationAction(
          this.state.value,
          this.state.sort
        );
      });
    } else {
      this.setState({ [e.target.name]: e.target.value, page: 1 }, () => {
        this.props.fetchProductsAction(
          this.state.value,
          this.state.sort,
          this.state.page,
          this.state.limit
        );
        this.props.fetchProductsActionWithoutPaginationAction(
          this.state.value,
          this.state.sort
        );
      });
    }
  };

  componentDidMount() {
    this.props.fetchProductsAction(
      this.state.value,
      this.state.sort,
      this.state.page,
      this.state.limit
    );
    this.props.fetchProductsReal();
    this.props.fetchProductsActionWithoutPaginationAction(
      this.state.value,
      this.state.sort
    );
  }

  render() {
    return (
      <div style={styles.catalog}>
        <div style={styles.head}>All Items</div>&nbsp; &nbsp;
        <SearchBox handleChange={this.handleChange} />
        <hr></hr>
        {this.props.res ? (
          <React.Fragment>
            {Object.keys(this.props.res).map((item, i) => (
              <Card product={this.props.res[item]} key={i}></Card>
            ))}
            <PaginationBox
              totalProducts={this.props.totalProducts}
              limit={this.state.limit}
              handleChange={this.handleChange}
            />
          </React.Fragment>
        ) : (
          <p>Fetching Products...........</p>
        )}
      </div>
    );
  }
}

Catalog.propTypes = {
  fetchProductsAction: PropTypes.func.isRequired,
  fetchProductsReal: PropTypes.func.isRequired,
  res: PropTypes.array,
  totalProducts: PropTypes.number,
  cartCost: PropTypes.number.isRequired,
  enabled: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    res: state.product.displayProducts,
    totalProducts: state.product.displayProductsTotal,
    enabled: Object.entries(state.cart.cartItems).length > 0 ? 1 : 0,
    cartCost: state.cart.cartCost,
  };
};

export default connect(mapStateToProps, {
  fetchProductsAction,
  fetchProductsActionWithoutPaginationAction,
  fetchProductsReal,
})(Catalog);
