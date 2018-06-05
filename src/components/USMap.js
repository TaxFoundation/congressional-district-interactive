import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import HoverContainer from './HoverContainer';
import { colorize } from '../helpers';
import STATES from '../data/states';

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
  render() {
    const path = geoPath().projection(
      geoAlbersUsa()
        .scale(this.props.scale.scale)
        .translate([
          this.props.scale.xScale / 2,
          this.props.scale.yScale / 2 - 25,
        ])
    );

    const districtsFeatures = feature(
      this.props.districts,
      this.props.districts.objects.districts
    ).features;

    const districtShapes = districtsFeatures.map(d => {
      const stateId = Math.floor(+d.id / 100);
      const districtId = d.id % 100;
      const hash = `${this.props.activeBucket}`;
      let districtData;
      if (this.props.data[stateId] && this.props.data[stateId][districtId]) {
        districtData = this.props.data[stateId][districtId][
          this.props.activeBucket
        ];
        return (
          <District
            d={path(d)}
            theColor={
              districtData && districtData.i
                ? colorize(districtData.t / districtData.i, this.props.domain)
                : '#888'
            }
            id={`district-${d.id}`}
            key={`district-${d.id}`}
          />
        );
      } else {
        return null;
      }
    });

    const states = feature(
      this.props.us,
      this.props.us.objects.states
    ).features.map(d => {
      const stateInfo = STATES.find(s => s.id === +d.id);

      return (
        <State
          d={path(d)}
          data-tip={stateInfo ? stateInfo.name : null}
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
        <svg
          width="100%"
          viewBox={`0 0 ${this.props.scale.xScale} ${this.props.scale.yScale}`}
        >
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
