import { Link } from "react-router-dom";
import React from "react";
import LoggingContext from "../contexts/LoggingContext";

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
  input:{
    width: '42%',
    margin:'1%',
    lineHeight: '40px',
    textAlign: 'center',
    background: '#d6b9ae14',
    borderRadius: '11px',
    borderStyle: 'solid',
    borderColor: '#0099ff'
  },
  login:{
    width:'21%',
    height:'30px',
    border:'none',
    margin:'1px',
    background: '#70ff93'

  },
  reset:{
    width:'21%',
    height:'30px',
    border:'none',
    margin:'1px',
    background: '#ff7086'
    }
};

export default class Login extends React.Component {
  static contextType = LoggingContext;

  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    fetch(
      "http://localhost:3004/profiles?username=" +
        this.state.username +
        "&password=" +
        this.state.password
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length !== 0) {
          data[0].loggedIn = true;
          this.context.setUser(data[0]);
          this.props.history.goBack();
        } else {
          alert("Invalid Credentials");
        }
      });
    event.preventDefault();
  }

  reset() {
    this.setState({ username: "", password: "" });
  }

  render() {
    return (
      <div style={styles.screen}>
        <Link to="/">
          <span>Back</span>{" "}
        </Link>
        <br></br>
        <div style={styles.head}>Login </div>
        <hr></hr>
        <div style={{ textAlign: "center" }}>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              style={styles.input}
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <br></br>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br></br>

            <input type="submit"  style={styles.login} value="Login" />

            <button type="button" style={styles.reset}  onClick={this.reset}>
              Reset
            </button>
          </form>
        </div>
      </div>
    );
  }
}
