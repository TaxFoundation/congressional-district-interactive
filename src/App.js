import React, { Component } from 'react';
import USMap from './components/USMap';
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
    id
      ? this.setState({ activeState: id })
      : this.setState({ activeState: null });
  }

  render() {
    return (
      <div className="App">
        <USMap us={us} districts={districts} />
      </div>
    );
  }
}

export default App;
