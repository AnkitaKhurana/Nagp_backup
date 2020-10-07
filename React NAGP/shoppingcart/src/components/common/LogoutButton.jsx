import React from "react";
import LoggingContext from "../../contexts/LoggingContext";
import { LoggingConsumer } from "../../contexts/LoggingContext";

const styles = {
  main: {},
  p: {
    float: "right",
    fontSize: "larger",
    fontFamily: "initial",
    color: "#4c4848",
    display: "inline-block",
  },
};

export default class LogoutButton extends React.Component {
  static contextType = LoggingContext;

  logout = () => {
    this.context.setUser({ name: "", loggedIn: false, password: "" });
  };
  render() {
    return (
      <LoggingConsumer>
        {(value) => {
          return (
            <div style={styles.main}>
              <span style={styles.p}>
                Welcome <b>{value.user.username}</b>
                <select id="logout" onChange={this.logout} defaultValue={""} >
                  <option value = "" hidden></option>
                  <option value="logout">Logout </option>
                </select>
              </span>
            </div>
          );
        }}
      </LoggingConsumer>
    );
  }
}
