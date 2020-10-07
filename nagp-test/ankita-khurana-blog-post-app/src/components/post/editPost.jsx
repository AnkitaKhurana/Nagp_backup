import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  editPostAction,
  fetchOnePostAction,
} from "../../stateManagement/actions/actions";

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
};
class EditPost extends Component {
  static firstTimeProp = true;
  constructor(props) {
    super(props);
    this.state = { title: "", category: "", content: "", firstTimeProp: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.push("/");
  }
  componentDidMount() {
    this.props.fetchOnePostAction(this.props.match.params.id);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.firstTimeProp) {
      return {
        firstTimeProp: false,
        title: nextProps.post.title,
        category: nextProps.post.category,
        content: nextProps.post.content,
      };
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    if (!this.state.title) alert("Title Cannot be blank");
    else {
      this.props.editPostAction(this.state,this.props.match.params.id);
      event.preventDefault();
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div style={styles.screen}>
        <Link to="/">
          <span>Go Back to Posts</span>{" "}
        </Link>
        <br></br>
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

            <input type="submit" style={styles.add} value="Save" />

            <button type="button" style={styles.reset} onClick={this.goBack}>
              Back
            </button>
          </form>
        </div>
      </div>
    );
  }
}

EditPost.propTypes = {
  editPostAction: PropTypes.func.isRequired,
  fetchOnePostAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    post: state.post.currentPost,
  };
};
export default connect(mapStateToProps, { editPostAction, fetchOnePostAction })(
  EditPost
);
