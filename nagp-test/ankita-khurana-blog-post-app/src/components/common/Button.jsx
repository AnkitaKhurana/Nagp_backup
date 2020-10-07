import React, { Component } from "react";
import { Link } from "react-router-dom";
import MaterialButton from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const useStyles= theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
});


class Button extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to={this.props.button.url}  style={{ textDecoration: 'none' }} >
          <MaterialButton variant="contained" color="secondary">
          {this.props.button.title}
          </MaterialButton>
        </Link>
      </React.Fragment>
    );
  }
}

export default (withStyles(useStyles))(Button);
