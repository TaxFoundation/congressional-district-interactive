import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import USMap from './components/USMap';
import StateMap from './components/StateMap';
import us from './data/us.json';
import districts from './data/us-congress-113.json';
import data from './data/data.json';
import Legend from './components/Legend';
import Banner from './components/Banner';
import SocialButtons from './components/SocialButtons';

const AppWrapper = styled.div`
  color: #333;
  font-family: 'Lato', sans-serif;
  margin: 0 auto;
  max-width: 1024px;

  * {
    box-sizing: border-box;
  }
`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      activeState: 0,
      stateData: null,
      activeBucket: 3,
      domain: [0, 0.06],
    };

    this.scale = 780;
    this.xScale = 600;
    this.yScale = 400;
    this.xScalar = this.xScale / 600;
    this.yScalar = this.yScale / 400;

    this.updateActiveState = this.updateActiveState.bind(this);
    this.updateBucket = this.updateBucket.bind(this);
    this.updateChildren = this.updateChildren.bind(this);
  }

  updateActiveState(id) {
    const theId = +id;

    if (theId > 0) {
      this.getStateData(theId)
        .then(data => {
          this.setState({ activeState: theId, stateData: data });
        })
        .catch(err => console.log(err));
    } else {
      this.setState({ stateData: null, activeState: 0 });
    }
  }

  updateBucket(activeBucket) {
    this.setState({ activeBucket });
  }

  updateChildren(activeChildren) {
    this.setState({ activeChildren });
  }

  async getStateData(stateId) {
    const tfUrl =
      'https://static.taxfoundation.org/congressional-districts-2018/';
    const response = await fetch(
      `${process.env.REACT_APP_ENV === 'taxfoundation' ? tfUrl : ''}states/${
        stateId < 10 ? `0${stateId}` : stateId
      }.json`
    );
    const data = await response.json();
    return data;
  }

  render() {
    return (
      <AppWrapper className="App">
        {process.env.REACT_APP_ENV === 'taxfoundation' ? null : (
          <Fragment>
            <Banner />
            <h1 style={{ textAlign: 'center' }}>Mapping 2018 Tax Reform</h1>
            <h2 style={{ textAlign: 'center' }}>
              The Impact of the Tax Cuts and Jobs Act by Congressional District
            </h2>
            <SocialButtons
              size="30px"
              message={`How will the Tax Cuts and Jobs Act impact incomes in your congressional district? Check out this new interactive map. ${
                window.location.href
              }`}
              hashtags="TaxReform"
              emailSubject="Mapping 2018 Tax Reform"
              emailBody={`The Tax Foundation's 2018 tax reform map shows you how the Tax Cuts and Jobs Act will impact average incomes in congressional districts around the country. You can see the impact on your district here: ${
                window.location.href
              }`}
            />
          </Fragment>
        )}
        <Navigation
          values={this.state}
          updateBucket={this.updateBucket}
          updateChildren={this.updateChildren}
          updateActiveState={this.updateActiveState}
        />
        <Legend domain={this.state.domain} steps={19} />
        {this.state.stateData ? (
          <StateMap
            activeState={this.state.activeState}
            stateData={this.state.stateData}
            data={data[this.state.activeState]}
            domain={this.state.domain}
            activeBucket={this.state.activeBucket}
            activeChildren={this.state.activeChildren}
            updateActiveState={this.updateActiveState}
            scale={{
              scale: this.scale,
              xScale: this.xScale,
              yScale: this.yScale,
            }}
          />
        ) : (
          <USMap
            us={us}
            districts={districts}
            data={data}
            domain={this.state.domain}
            activeBucket={this.state.activeBucket}
            activeChildren={this.state.activeChildren}
            updateActiveState={this.updateActiveState}
            scale={{
              scale: this.scale,
              xScale: this.xScale,
              yScale: this.yScale,
            }}
          />
        )}
      </AppWrapper>
    );
  }
}

export default App;
