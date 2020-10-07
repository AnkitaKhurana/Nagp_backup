import React , {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import  {Link} from 'react-router-dom';
import {editPostAction, fetchOnePostAction} from '../../stateManagement/actions/actions';

class EditPost extends Component {
    static firstTime = true;
    constructor(props){
        super(props);
        this.state = {
            title : "",
            content: "",
            category : "",
            firstTime: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    goBack(){
        this.props.history.push('/')
    }

    static getDerivedStateFromProps(nextProps,prevState){
        
        if(nextProps.post.length>0 && prevState.firstTime){

            return {
                title : nextProps.post[0].title,
                category : nextProps.post[0].category,
                content : nextProps.post[0].content,
                firstTime : false
            }
           
        }
        
        else return null;
    }
    handleChange(e){
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        let id = this.props.match.params.id;
        this.props.editPostAction(id,this.state);
        this.goBack()
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.fetchOnePostAction(id);
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


EditPost.propType = {
    editPostAction: PropTypes.func.isRequired,
    fetchOnePostAction: PropTypes.func.isRequired
}


const mapStateToProps = (state)=>{
    return {
        post: state.post.currentPost
    }
}

export default connect(mapStateToProps, {editPostAction,fetchOnePostAction })(EditPost);