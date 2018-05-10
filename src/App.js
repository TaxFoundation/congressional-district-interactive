import React, { Component } from 'react';
import USMap from './components/USMap';
import StateMap from './components/StateMap';
import us from './data/us.json';
import districts from './data/us-congress-113.json';

class App extends Component {
  constructor() {
    super();

    this.state = {
      activeState: null,
    };

    this.updateActiveState = this.updateActiveState.bind(this);
  }

  updateActiveState(id) {
    this.setState({ activeState: id });
  }

  render() {
    return (
      <div className="App">
        {this.state.activeState ? (
          <StateMap
            activeState={this.state.activeState}
            updateActiveState={this.updateActiveState}
          />
        ) : (
          <USMap
            us={us}
            districts={districts}
            updateActiveState={this.updateActiveState}
          />
        )}
      </div>
    );
  }
}

export default App;
