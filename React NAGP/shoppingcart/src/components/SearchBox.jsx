import React from "react";
import { fetchProductsAction } from "../actions/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", sort: "" };
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value }, () => {
      this.props.fetchProductsAction(this.state.value, this.state.sort);
    });
  };
  handleChangeDropDown = (e) => {
    this.setState({ sort: e.target.value }, () => {
      this.props.fetchProductsAction(this.state.value, this.state.sort);
    });
  };
  render() {
    return (
      <React.Fragment>
        <input
           size="35"
          onKeyUp={this.handleChange}
          onChange={this.handleChange}
          style={{ float: "right",  textAlign: 'center', height: '30px'}}
          type="text"
          placeholder="Search Product"
        ></input>
        <select id="sort" onChange={this.handleChangeDropDown.bind(this)} className="select-css">
          <option value="">Sort By Price</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <br></br>
        <br></br>
      </React.Fragment>
    );
  }
}

SearchBox.propTypes = {
  fetchProductsAction: PropTypes.func.isRequired,
};

export default connect(null, { fetchProductsAction })(SearchBox);
