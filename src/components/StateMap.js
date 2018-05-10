import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { colorize } from '../helpers';

const District = styled.path.attrs({
  fill: props => (props.theColor ? props.theColor : '#333'),
})`
  cursor: pointer;
  stroke: #fff;
  stroke-width: 1;
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

class StateMap extends React.Component {
  constructor(props) {
    super(props);

    this.scale = 780;
    this.xScale = 600;
    this.yScale = 400;
    this.xScalar = this.xScale / 600;
    this.yScalar = this.yScale / 400;

    this.state = {
      stateData: null,
    };

    this.getStateData = this.getStateData.bind(this);
  }

  componentDidMount() {
    this.getStateData(this.props.activeState)
      .then(data => this.setState({ stateData: data }))
      .catch(err => console.log(err));
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

      const districtShapes = districtsFeatures.features.map(d => {
        return (
          <District
            d={path(d)}
            theColor={colorize(Math.random(), [0, 1])}
            id={`district-detail-${d.properties.CD114FP}`}
            key={`district-detail-${d.properties.CD114FP}`}
          />
        );
      });

      return (
        <svg width="100%" viewBox={`0 0 ${this.xScale} ${this.yScale}`}>
          <BG
            height={this.yScale}
            width={this.xScale}
            onClick={e => this.props.updateActiveState(null)}
          />
          {districtShapes}
        </svg>
      );
    }
  }
}

export default StateMap;
