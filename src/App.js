import React, { Component } from 'react';
import Navigation from './components/Navigation';
import USMap from './components/USMap';
import StateMap from './components/StateMap';
import us from './data/us.json';
import districts from './data/us-congress-113.json';
import data from './data/data.json';

class App extends Component {
  constructor() {
    super();

    this.state = {
      activeState: null,
      activeBucket: '30-75',
      activeStatus: 1,
      activeChildren: 2,
      domain: [-0.05, 0.05],
    };

    this.updateActiveState = this.updateActiveState.bind(this);
    this.updateBucket = this.updateBucket.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateChildren = this.updateChildren.bind(this);
  }

  updateActiveState(id) {
    this.setState({ activeState: id });
  }

  updateBucket(activeBucket) {
    this.setState({ activeBucket });
  }

  updateStatus(activeStatus) {
    this.setState({ activeStatus });
  }

  updateChildren(activeChildren) {
    this.setState({ activeChildren });
  }

  render() {
    return (
      <div className="App">
        <Navigation
          values={this.state}
          updateBucket={this.updateBucket}
          updateStatus={this.updateStatus}
          updateChildren={this.updateChildren}
        />
        {this.state.activeState ? (
          <StateMap
            activeState={this.state.activeState}
            data={data[this.state.activeState]}
            domain={this.state.domain}
            activeBucket={this.state.activeBucket}
            activeStatus={this.state.activeStatus}
            activeChildren={this.state.activeChildren}
            updateActiveState={this.updateActiveState}
          />
        ) : (
          <USMap
            us={us}
            districts={districts}
            data={data}
            domain={this.state.domain}
            activeBucket={this.state.activeBucket}
            activeStatus={this.state.activeStatus}
            activeChildren={this.state.activeChildren}
            updateActiveState={this.updateActiveState}
          />
        )}
      </div>
    );
  }
}

export default App;
