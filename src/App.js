import React, { Component } from 'react';
import Navigation from './components/Navigation';
import USMap from './components/USMap';
import StateMap from './components/StateMap';
import us from './data/us.json';
import districts from './data/us-congress-113.json';
import { csvParse } from 'd3-dsv';
import data from './data/data';

class App extends Component {
  constructor() {
    super();

    this.state = {
      activeState: null,
      income: '30-75',
      filingStatus: 1,
      children: 2,
    };

    this.updateActiveState = this.updateActiveState.bind(this);
    this.updateIncome = this.updateIncome.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateChildren = this.updateChildren.bind(this);

    this.data = csvParse(data);
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
            updateActiveState={this.updateActiveState}
          />
        ) : (
          <USMap
            data={this.data}
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
