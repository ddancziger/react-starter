// @flow
import React, { Component } from 'react';

type Props = {
};

type State = {
  message: string,
};


class App extends Component <void, Props, State> {
  
  state = {
    message: 'Hello!',
  }
  handleClick = () => {
    alert(this.state.message); // eslint-disable-line
  };

  render() {
    return (
      <div>
        Welcome to react starter!
        <button onClick={ this.handleClick }>
         Say hello
        </button>
      </div>
      
    );
  }

}

export default App;
