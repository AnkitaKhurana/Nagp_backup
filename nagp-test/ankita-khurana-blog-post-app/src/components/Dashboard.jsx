import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./common/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PostList from "./post/postList";
import NewPost from "./post/addPost";
import PostPage from "./post/postPage";
import EditPost from "./post/editPost";
import Footer from "./common/Footer";

export class Dashboard extends Component {
  render() {
   
    return (
      <React.Fragment>
        <Router>
          <Header />
           <Route exact path="/(posts|)/" component={PostList} />
            <Route exact path="/new" component={NewPost} />
            <Route exact path="/post/:id" component={PostPage} />
            <Route exact path="/post/edit/:id" component={EditPost} />
        </Router>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default connect(null, {})(Dashboard);
