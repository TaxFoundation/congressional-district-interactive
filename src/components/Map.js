import React from 'react';
import PropTypes from 'prop-types';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { colorize } from '../helpers';
import us from '../data/us.json';
import districts from '../data/us-congress-113.json';

class Map extends React.Component {
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
          key={`district-${d.id}`}
          id={`district-${d.id}`}
          d={path(d)}
          fill={colorize(Math.random(), [0, 1])}
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeLinejoin="bevel"
        />
      );
    });

    const states = feature(us, us.objects.states).features.map(d => {
      return (
        <path
          key={`state-${d.id}`}
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinejoin="bevel"
          d={path(d)}
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

export default Map;
