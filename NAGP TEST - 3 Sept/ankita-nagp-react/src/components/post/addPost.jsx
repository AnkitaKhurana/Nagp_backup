import React , {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import  {Link} from 'react-router-dom';
import {addPostAction} from '../../stateManagement/actions/actions';

class AddPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            title : "",
            content: "",
            category : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    goBack(){
        this.props.history.push('/')
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(){
        if(this.state.title == "")
            alert("Title cannot be blank")
        this.props.addPostAction(this.state);
        this.goBack();
    }
    

    render(){
        return(<React.Fragment>
            <form onSubmit = {this.handleSubmit}>
                <input type="text" placeholder="Title" value={this.state.title} onChange={this.handleChange} name="title"></input>
                <input type="text" placeholder="Category" value={this.state.category} onChange={this.handleChange} name="category"></input>
                <input type="text" placeholder="Content" value={this.state.content} onChange={this.handleChange} name="content"></input>
                <input type="submit"></input>
            </form>
        
        </React.Fragment>);
    }
}


AddPost.propType = {
    addPostAction: PropTypes.func.isRequired
}


const mapStateToProps = (state)=>{
    return {
        post: state.post.posts
    }
}

export default connect(mapStateToProps, {addPostAction })(AddPost);