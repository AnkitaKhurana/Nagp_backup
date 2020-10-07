import React , {Component} from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props){
        super(props);
    }
    render(){
    return(<Link to={this.props.button.url}><button>{this.props.button.name}</button></Link>);
    }
}

export default Dashboard;