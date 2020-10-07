import React , {Component} from 'react';
import {fetchPostsAction} from '../../stateManagement/actions/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

class PostList extends Component {
    componentDidMount(){
        this.props.fetchPostsAction();
    }
    render(){

        let addButton = {
            url : '/add',
            name : 'Add New Post' 
        };
        console.log(this.props.res)
        return(<React.Fragment>
            <div>
                <Button button={addButton}></Button>
        {this.props.res.length>0?this.props.res.map(element=><Link to={`/post/`+element.id}><div key={element.id}>{element.title}</div></Link>): <React.Fragment></React.Fragment>}
            </div>
        
        </React.Fragment>);
    }
}


PostList.propType = {
    fetchPostsAction: PropTypes.func.isRequired
}


const mapStateToProps = (state)=>{
    return {
        res: state.post.posts
    }
}

export default connect(mapStateToProps, {fetchPostsAction})(PostList);