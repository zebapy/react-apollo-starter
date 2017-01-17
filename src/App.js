import React, { Component } from 'react';
import { Match } from 'react-router';
import Home from './Home';
import { FlexBox, FlexItem } from './FlexBox';

class App extends Component {
  render() {
    return (
      <FlexBox>
        <FlexItem>
          <h1>apollo boilerplate</h1>
        </FlexItem>
        <FlexItem>
          <Match pattern="/" component={Home} />
        </FlexItem>
      </FlexBox>
    );
  }
}

export default App;
