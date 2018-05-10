import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import HoverContainer from './HoverContainer';
import { colorize } from '../helpers';

const State = styled.path`
  cursor: pointer;
  fill: transparent;
  stroke: #fff;
  stroke-width: 1;
  stroke-linejoin: bevel;

  &:hover {
    fill: rgba(255, 255, 255, 0.3);
    stroke-width: 2;
  }
`;

const District = styled.path.attrs({
  fill: props => (props.theColor ? props.theColor : '#333'),
})`
  stroke: #fff;
  stroke-width: 0.5;
  stroke-linejoin: bevel;
`;

class USMap extends Component {
  constructor(props) {
    super(props);

    this.scale = 780;
    this.xScale = 600;
    this.yScale = 400;
    this.xScalar = this.xScale / 600;
    this.yScalar = this.yScale / 400;
  }

  render() {
    const path = geoPath().projection(
      geoAlbersUsa()
        .scale(this.scale)
        .translate([this.xScale / 2, this.yScale / 2 - 25])
    );

    const districtsFeatures = feature(
      this.props.districts,
      this.props.districts.objects.districts
    ).features;

    const districtShapes = districtsFeatures.map(d => {
      return (
        <District
          d={path(d)}
          theColor={colorize(Math.random(), [0, 1])}
          id={`district-${d.id}`}
          key={`district-${d.id}`}
        />
      );
    });

    const states = feature(
      this.props.us,
      this.props.us.objects.states
    ).features.map(d => {
      return (
        <State
          d={path(d)}
          data-tip={`This is state ${d.id}`}
          data-for="usmap"
          key={`state-${d.id}`}
          onClick={e => {
            this.props.updateActiveState(d.id);
          }}
        />
      );
    });

    return (
      <Fragment>
        <svg width="100%" viewBox={`0 0 ${this.xScale} ${this.yScale}`}>
          <defs>
            <path
              id="land"
              d={path(feature(this.props.us, this.props.us.objects.land))}
            />
          </defs>
          <clipPath id="clip-land">
            <use xlinkHref="#land" />
          </clipPath>
          <g clipPath="url(#clip-land)">{districtShapes}</g>
          <g>{states}</g>
        </svg>
        <HoverContainer id="usmap" aria-haspopup="true" />
      </Fragment>
    );
  }
}

USMap.propTypes = {
  us: PropTypes.object,
  districts: PropTypes.object,
  updateActiveState: PropTypes.func,
};

export default USMap;
