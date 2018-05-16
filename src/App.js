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
    };

    this.updateActiveState = this.updateActiveState.bind(this);
    this.updateIncome = this.updateIncome.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateChildren = this.updateChildren.bind(this);
  }

  updateActiveState(id) {
    this.setState({ activeState: id });
  }

  updateIncome(income) {
    this.setState({ income });
  }

  updateStatus(filingStatus) {
    this.setState({ filingStatus });
  }

  updateChildren(children) {
    this.setState({ children });
  }

  render() {
    return (
      <div className="App">
        <Navigation
          updateIncome={this.updateIncome}
          updateStatus={this.updateStatus}
          updateChildren={this.updateChildren}
        />
        {this.state.activeState ? (
          <StateMap
            activeState={this.state.activeState}
            data={data[this.state.activeState]}
            domain={data.domain}
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
