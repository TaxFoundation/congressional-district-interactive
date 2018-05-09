import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { colorize } from '../helpers';
import us from '../data/us.json';
import districts from '../data/us-congress-113.json';

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

class USMap extends React.Component {
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

    const districtsFeatures = feature(districts, districts.objects.districts)
      .features;

    const districtShapes = districtsFeatures.map(d => {
      return (
        <path
          d={path(d)}
          fill={colorize(Math.random(), [0, 1])}
          id={`district-${d.id}`}
          key={`district-${d.id}`}
          stroke="#ffffff"
          strokeLinejoin="bevel"
          strokeWidth="0.5"
        />
      );
    });

    const states = feature(us, us.objects.states).features.map(d => {
      return (
        <State
          d={path(d)}
          fill="none"
          key={`state-${d.id}`}
          stroke="#fff"
          strokeLinejoin="bevel"
          strokeWidth="1"
        />
      );
    });

    return (
      <svg width="100%" viewBox={`0 0 ${this.xScale} ${this.yScale}`}>
        <defs>
          <path id="land" d={path(feature(us, us.objects.land))} />
        </defs>
        <clipPath id="clip-land">
          <use xlinkHref="#land" />
        </clipPath>
        <g clipPath="url(#clip-land)">{districtShapes}</g>
        <g>{states}</g>
      </svg>
    );
  }
}

export default USMap;