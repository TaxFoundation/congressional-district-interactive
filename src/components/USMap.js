import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
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
  ${props => (props.active ? null : 'display: none;')} stroke: #fff;
  stroke-width: 0.5;
  stroke-linejoin: bevel;
`;

class USMap extends React.Component {
  constructor(props) {
    super(props);

    this.scale = 780;
    this.xScale = 600;
    this.yScale = 400;
    this.xScalar = this.xScale / 600;
    this.yScalar = this.yScale / 400;

    this.state = {
      activeState: null,
      translateX: 0,
      translateY: 0,
      zoom: 1,
    };

    this.computeTransform = this.computeTransform.bind(this);
    this.updateActiveState = this.updateActiveState.bind(this);
    this.updateTransform = this.updateTransform.bind(this);
  }

  updateActiveState(id) {
    this.setState({ activeState: +id });
  }

  computeTransform(bounds) {
    let dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = 0.9 / Math.max(dx / this.xScale, dy / this.yScale),
      translateX = this.xScale / 2 - scale * x,
      translateY = this.yScale / 2 - scale * y;

    this.updateTransform(translateX, translateY, scale);
  }

  updateTransform(x, y, z) {
    this.setState({
      translateX: x,
      translateY: y,
      zoom: z,
    });
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
      let active = true;
      let stateId = 0;
      const idArray = d.id.toString(10).split('');
      if (idArray.length > 3) {
        stateId = parseInt(`${idArray[0]}${idArray[1]}`, 10);
      } else {
        stateId = parseInt(idArray[0], 10);
      }

      if (this.state.activeState && this.state.activeState !== stateId) {
        active = false;
      }

      return (
        <District
          active={active}
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
          key={`state-${d.id}`}
          onClick={e => {
            this.updateActiveState(d.id);
            this.computeTransform(path.bounds(d));
          }}
        />
      );
    });

    return (
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
        <g
          clipPath="url(#clip-land)"
          transform={`translate(${this.state.translateX}, ${
            this.state.translateY
          })scale(${this.state.zoom})`}
        >
          {districtShapes}
        </g>
        {this.state.activeState ? null : <g>{states}</g>}
      </svg>
    );
  }
}

export default USMap;
