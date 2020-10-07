import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import {fetchOnePostAction, likeAction, unlikeAction, deletePostAction} from '../../stateManagement/actions/actions';

class PostPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:"",
            title : "",
            content: "",
            category : "",
            liked: false,
            firstTime: true
        };
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
        this.delete = this.delete.bind(this);
    }
    like(){
        let id = this.props.match.params.id;

        this.setState({liked: true})
        this.props.likeAction(id);

    }
    unlike(){
        let id = this.props.match.params.id;

        this.setState({liked: false})

        this.props.unlikeAction(id);

    }
    delete(){
        let id = this.props.match.params.id;
        this.props.deletePostAction(id);
        this.props.history.push('/')

    }
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.fetchOnePostAction(id);
    }
    static getDerivedStateFromProps(nextProps,prevState){

        if(nextProps.post.length>0 && prevState.firstTime){
            return {
                id : nextProps.post[0].id,
                title : nextProps.post[0].title,
                category : nextProps.post[0].category,
                content : nextProps.post[0].content,
                firstTime : false
            }
           
        }
        
        else return null;
    }
    render(){
       
        return(<React.Fragment>
                        <Link to="/"><div>GO BACK</div></Link>

            {!this.state.liked? <button  onClick={this.like}>Like</button> : <button  onClick={this.unlike}>Unlike</button> }
           
            <button onClick={this.delete}>Delete</button> 
            <Link to={`/edit/`+this.state.id}><div>Edit</div></Link>
            TITLE : {this.state.title}<br></br>
            CATEGORY : {this.state.category}<br></br>
            CONTENT : {this.state.content}<br></br>
            
        </React.Fragment>);
    }
}

PostPage.propType = {
    fetchOnePostAction: PropTypes.func.isRequired,
    likeAction: PropTypes.func.isRequired,
    unlikeAction: PropTypes.func.isRequired,
    deletePostAction: PropTypes.func.isRequired,

}


const mapStateToProps = (state)=>{
    return {
        post: state.post.currentPost
    }
}

export default connect(mapStateToProps, {fetchOnePostAction, likeAction, unlikeAction, deletePostAction} )(PostPage);