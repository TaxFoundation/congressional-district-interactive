import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { geoAlbersUsa, geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import HoverContainer from './HoverContainer';
import { colorize, formatter } from '../helpers';

const District = styled.path.attrs({
  fill: props => (props.theColor ? props.theColor : '#333'),
})`
  cursor: pointer;
  stroke: #fff;
  stroke-width: 0.5;
  stroke-linejoin: bevel;

  &:hover {
    stroke-width: 2;
  }
`;

const BG = styled.rect`
  cursor: pointer;
  fill: transparent;
  height: ${props => props.height};
  width: ${props => props.width};
`;

class StateMap extends Component {
  constructor(props) {
    super(props);

    this.scale = 780;
    this.xScale = 600;
    this.yScale = 400;
    this.xScalar = this.xScale / 600;
    this.yScalar = this.yScale / 400;

    this.state = {
      stateData: null,
      activeDistrict: null,
      activeIncome: 0,
      activeStateTax: 0,
      activeTaxDelta: 0,
    };

    this.getStateData = this.getStateData.bind(this);
    this.updateActiveDistrict = this.updateActiveDistrict.bind(this);
  }

  componentDidMount() {
    this.getStateData(this.props.activeState)
      .then(data => this.setState({ stateData: data }))
      .catch(err => console.log(err));
  }

  updateActiveDistrict(id, districtData) {
    this.setState({
      activeDistrict: id,
      activeIncome: districtData.i,
      activeStateTax: districtData.s,
      activeTaxDelta: districtData.t,
    });
  }

  async getStateData(stateId) {
    const response = await fetch(
      `states/${stateId < 10 ? `0${stateId}` : stateId}.json`
    );
    const data = await response.json();
    return data;
  }

  render() {
    if (this.state.stateData === null) {
      return null;
    } else {
      const districtsFeatures = feature(
        this.state.stateData,
        this.state.stateData.objects[
          this.props.activeState < 10
            ? `0${this.props.activeState}`
            : this.props.activeState
        ]
      );

      const path = geoPath().projection(
        geoMercator().fitSize([this.xScale, this.yScale], districtsFeatures)
      );

      const altPath = geoPath().projection(
        geoAlbersUsa().fitSize([this.xScale, this.yScale], districtsFeatures)
      );

      const districtShapes = districtsFeatures.features.map(d => {
        const districtId = +d.properties.CD114FP;
        const hash = `${this.props.activeBucket}${this.props.activeStatus}${
          this.props.activeChildren
        }`;
        if (this.props.data[districtId]) {
          const districtData = this.props.data[districtId][hash];

          return (
            <District
              data-tip={`<h3>${
                districtId > 0 ? `District ${districtId}` : 'At-Large District'
              }</h3>
               <p>Average Income is ${formatter(districtData.i)}</p>
    <p>Average state taxes paid is ${formatter(districtData.s)}</p>
    <p>Average tax ${+districtData.t > 0 ? 'increase' : 'cut'} is ${formatter(
                Math.abs(districtData.t)
              )}</p>
              `}
              data-for="statemap"
              d={
                this.props.activeState === 2 || this.props.activeState === 15
                  ? altPath(d)
                  : path(d)
              }
              theColor={
                districtData
                  ? colorize(districtData.t / districtData.i, this.props.domain)
                  : null
              }
              id={`district-detail-${d.properties.CD114FP}`}
              key={`district-detail-${d.properties.CD114FP}`}
            />
          );
        } else {
          return null;
        }
      });

      return (
        <Fragment>
          <svg width="100%" viewBox={`0 0 ${this.xScale} ${this.yScale}`}>
            <BG
              data-tip
              data-for="goBack"
              height={this.yScale}
              width={this.xScale}
              onClick={e => this.props.updateActiveState(null)}
            />
            {districtShapes}
          </svg>
          <HoverContainer id="statemap" html={true} />
          <HoverContainer
            id="goBack"
            getContent={() => <p>Click to return to US map.</p>}
          />
        </Fragment>
      );
    }
  }
}

StateMap.propTypes = {
  activeState: PropTypes.number,
  updateActiveState: PropTypes.func,
};

export default StateMap;
