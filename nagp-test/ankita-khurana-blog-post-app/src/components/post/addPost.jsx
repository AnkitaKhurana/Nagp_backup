import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPostAction } from "../../stateManagement/actions/actions";

const styles = {
  screen: {
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
  input: {
    width: "42%",
    margin: "1%",
    lineHeight: "40px",
    textAlign: "center",
    background: "#d6b9ae14",
    borderRadius: "11px",
    borderStyle: "solid",
    borderColor: "#0099ff",
  },
  inputBig: {
    width: "82%",
    margin: "1%",
    lineHeight: "40px",
    textAlign: "center",
    background: "#d6b9ae14",
    borderRadius: "11px",
    borderStyle: "solid",
    borderColor: "#0099ff",
  },
  add: {
    width: "21%",
    height: "30px",
    border: "none",
    margin: "1px",
    background: "#70ff93",
  },
  reset: {
    width: "21%",
    height: "30px",
    border: "none",
    margin: "1px",
    background: "#ff7086",
  },
  back: {
    width: "21%",
    height: "30px",
    border: "none",
    margin: "1px",
    background: "rgb(69 61 220 / 41%)",
  },
};
class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", category: "", content: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
    this.back = this.back.bind(this);
  }
  reset() {
    this.setState({ title: "", category: "", content: "" });
  }
  back() {
    this.props.history.push("/");
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    if (!this.state.title) alert("Title Cannot be blank");
    else {
      this.props.addPostAction(this.state);
      event.preventDefault();
      this.props.history.push("/");
    }
    event.preventDefault();
  }

  render() {
    return (
      <div style={styles.screen}>
        <Link to="/">
          <span>Go Back to Posts</span>{" "}
        </Link>
        <br></br>
        <div style={styles.head}>Add New Post </div>
        <hr></hr>
        <div style={{ textAlign: "center" }}>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="title"
              style={styles.input}
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <br></br>
            <input
              style={styles.input}
              type="text"
              name="category"
              placeholder="Category"
              value={this.state.category}
              onChange={this.handleChange}
            />
            <br></br>
            <input
              style={styles.inputBig}
              type="text"
              name="content"
              placeholder="Content"
              value={this.state.content}
              onChange={this.handleChange}
            />
            <br></br>

            <input type="submit" style={styles.add} value="Add post" />

            <button type="button" style={styles.reset} onClick={this.reset}>
              Reset Fields
            </button>
            <input type="button" style={styles.back} value="Back" onClick={this.back} />

          </form>
        </div>
      </div>
    );
  }
}

NewPost.propTypes = {
  addPostAction: PropTypes.func.isRequired,
};

export default connect(null, { addPostAction })(NewPost);
