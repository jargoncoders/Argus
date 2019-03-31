import React, { Component } from 'react';
import ButtonAppBar from './components/ButtonAppBar'
import Main from './components/Main'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ButtonAppBar />
        <Main />
      </div>
    );
  }
}

export default App;
