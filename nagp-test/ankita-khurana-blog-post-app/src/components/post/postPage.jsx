/*eslint eqeqeq: "off"*/
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  fetchOnePostAction,
  deletePostAction,
  likeAction,
  unlikeAction,
} from "../../stateManagement/actions/actions";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MaterialButton from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = (theme) => ({
  root: {
    maxWidth: 305,
  },
});

const styles = {
  card: {
    margin: "4%",
  },
};

const StyledCard = withStyles((theme) => ({
  root: {
    backgroundColor: "#a1adab1f",
  }
}))(Card);

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  like(event) {
    this.props.likeAction(this.props.res.id);
    this.setState({ liked: true });
    event.preventDefault();
  }
  unlike(event) {
    this.props.unlikeAction(this.props.res.id);
    this.setState({ liked: false });
    event.preventDefault();
  }
  handleDelete(event) {
    this.props.deletePostAction(this.props.res.id);
    this.props.history.push("/");
    event.preventDefault();
  }
  handleEdit(event) {
    this.props.history.push("/post/edit/" + this.props.res.id);
    event.preventDefault();
  }
  componentDidMount() {
    this.props.fetchOnePostAction(this.props.match.params.id);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.res.liked != prevState.liked) {
      return { liked: nextProps.res.liked };
    } else return null;
  }
  render() {
    return (
      <div style={styles.card}>
        <Link to="/">
          <span>Go Back to Posts</span>{" "}
        </Link>
        <br></br>
        <br></br>
        <StyledCard>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.res.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.res.content}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <MaterialButton
              variant="contained"
              color="primary"
              onClick={this.handleEdit}
            >
              Edit
            </MaterialButton>
            <MaterialButton
              variant="contained"
              color="secondary"
              onClick={this.handleDelete}
            >
              Delete
            </MaterialButton>
            {this.state.liked ? (
              <FavoriteIcon onClick={this.unlike} />
            ) : (
              <FavoriteBorderIcon onClick={this.like} />
            )}
          </CardActions>
        </StyledCard>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    res: state.post.currentPost,
  };
};

PostPage.propTypes = {
  fetchOnePostAction: PropTypes.func.isRequired,
  deletePostAction: PropTypes.func.isRequired,
  likeAction: PropTypes.func.isRequired,
  unlikeAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  fetchOnePostAction,
  deletePostAction,
  likeAction,
  unlikeAction,
})(withStyles(useStyles)(PostPage));
