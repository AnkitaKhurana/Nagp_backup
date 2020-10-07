import React, { Component } from 'react';
import {Provider} from 'react-redux';
import './App.css';
import Dashboard from './components/Dashboard';
import createStore from './stateManagement/store';

const store = createStore;

class App extends Component {

  render(){
    return(
      <Provider store={store}>
        <Dashboard></Dashboard>
      </Provider>
    )
  }

}
export default App;
