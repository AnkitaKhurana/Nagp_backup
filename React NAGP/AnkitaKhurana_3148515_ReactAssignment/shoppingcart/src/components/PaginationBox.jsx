import React from "react";

const styles = {
  main: {
    display: "block",
    textAlign: "center",
    margin: "5%",
  },
  button: {
    color: "black",
    padding: "8px 16px",
    border: "solid",
    borderColor: "#3849b5",
    margin: "1.5px",
    backgroundColor: "white",
  },
};

class PaginationBox extends React.Component {
  changeColor = (e) => {
    for (let item of e.target.parentNode.children) {
      item.style.backgroundColor = "white";
    }
    e.target.style.backgroundColor = "#75c9ff";
  };

  onClickFun = (e) => {
    this.changeColor(e);
    this.props.handleChange(e);
  };
  render() {
    
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.totalProducts / this.props.limit);
      i++
    ) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <input
          name="page"
          key={number}
          type="button"
          style={styles.button}
          id={number}
          value={number}
          onClick={this.onClickFun}
        />
      );
    });
    return <div style={styles.main}>{renderPageNumbers}</div>;
  }
}

export default PaginationBox;
