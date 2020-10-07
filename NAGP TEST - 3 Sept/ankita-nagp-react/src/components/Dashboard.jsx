import React , {Component} from 'react';
import PostList from '../components/post/postList';
import AddPost from '../components/post/addPost';
import EditPost from '../components/post/editPost';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import postPage from './post/postPage';

class Dashboard extends Component {
    render(){
        return(<React.Fragment>
        <Router>
            <Route exact path="/(posts|)/" component={PostList}></Route>
            <Route exact path="/add/" component={AddPost}></Route>
            <Route exact path="/post/:id" component={postPage}></Route>
            <Route exact path="/edit/:id" component={EditPost}></Route>
        </Router>       
        </React.Fragment>);
    }
}

export default Dashboard;