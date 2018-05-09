import React, { Component } from 'react';
import USMap from './components/USMap';
import us from './data/us.json';
import districts from './data/us-congress-113.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <USMap us={us} districts={districts} />
      </div>
    );
  }
}

export default App;
