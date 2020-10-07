import React from "react";

class SearchBox extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input
          size="35"
          name="value"
          onKeyUp={this.props.handleChange}
          onChange={this.props.handleChange}
          style={{ float: "right", textAlign: "center", height: "30px" }}
          type="text"
          placeholder="Search Product"
        ></input>
        <select
          name="sort"
          id="sort"
          onChange={this.props.handleChange.bind(this)}
          className="select-css"
        >
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

export default SearchBox;
