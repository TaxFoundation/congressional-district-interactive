import React from 'react';
import PropTypes from 'prop-types';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import us from '../data/us.json';
import districts from '../data/us-congress-113.json';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.scale = 800;
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

    const USFeatures = feature(
      us,
      us.objects.states
    ).features;

    const districtsFeatures = feature(
      districts,
      districts.objects.districts
    ).features;

    const states = USFeatures.map(d => {
      return (
        <path key={`state-${d.id}`} id={`state-${d.id}`} d={path(d)}></path>
      );
    })

    return (
      <svg
        width="100%"
        viewBox={`0 0 ${this.xScale} ${this.yScale}`}
      >
        <g>{states}</g>
      </svg>
    );
  }
}

export default Map;