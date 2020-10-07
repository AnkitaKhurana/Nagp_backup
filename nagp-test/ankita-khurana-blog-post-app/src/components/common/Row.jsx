import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class Row extends Component {
  render() {
    if (this.props.post)
      return (
        <React.Fragment>
          <StyledTableRow key={this.props.post.title}>
            <StyledTableCell component="th" scope="row">
              <Link
                to={"/post/" + this.props.post.id}
                style={{ textDecoration: "none" }}
              >
                {this.props.post.title}
              </Link>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Link
                to={"/post/" + this.props.post.id}
                style={{ textDecoration: "none" }}
              >
                {this.props.post.category ? (
                  <Chip
                    variant="outlined"
                    color="primary"
                    avatar={
                      <Avatar>
                        {this.props.post.category[0].toUpperCase()}
                      </Avatar>
                    }
                    label={this.props.post.category}
                  />
                ) : (
                  <React.Fragment />
                )}
              </Link>
            </StyledTableCell>
          </StyledTableRow>
        </React.Fragment>
      );
    else return <React.Fragment></React.Fragment>;
  }
}

export default Row;
