import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPostsAction } from "../../stateManagement/actions/actions";
import Row from "../common/Row";
import Button from "../common/Button";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";

const useStyles = (theme) => ({
  table: {
    minWidth: 700,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
  button: {
    align: "right",
  },
};

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPostsAction();
  }

  render() {
    let addButton = {
      url: "/new",
      title: "Add New Post",
    };
    return (
      <div style={styles.catalog}>
        <div style={styles.head}>Posts</div>&nbsp; &nbsp;
        <span style={styles.button}>
          <Button button={addButton} />
        </span>
        <hr></hr>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Post Title</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.res.length > 0 ? (
                this.props.res.map((item, i) => <Row post={item} key={i}></Row>)
              ) : (
                <p>No posts ........... Add New Posts :)</p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

PostList.propTypes = {
  fetchPostsAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    res: state.post.posts,
  };
};

export default connect(mapStateToProps, { fetchPostsAction })(
  withStyles(useStyles)(PostList)
);
