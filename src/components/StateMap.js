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

const dataTip = (theState, theDistrict, bucket, data) => {
  const buckets = {
    0: '$0 to $10k',
    1: '$10 to $25k',
    2: '$25k to $50k',
    3: '$50k to $75k',
    4: '$75k to $100k',
    5: '$100k to $200k',
    6: '$200k and up',
  };

  return `
  <h3>
    ${
      theDistrict > 0
        ? `District ${theDistrict}`
        : theState === 11
          ? 'District of Columbia'
          : 'At-Large District'
    }
  </h3>
  <p>Average income ${buckets[bucket]} is ${formatter(data.i, '$')}.</p>
  <p>Average state taxes paid is ${formatter(data.s, '$')}.</p>
  <p>
    Average tax ${+data.t > 0 ? 'increase' : 'cut'} is
    ${formatter(Math.abs(data.t), '$')}, or ${formatter(
    Math.abs(data.t / data.i),
    '%'
  )} ${+data.t > 0 ? 'more' : 'less'}.
  </p>
  `;
};

class StateMap extends Component {
  render() {
    if (this.props.stateData === null) {
      return null;
    } else {
      const districtsFeatures = feature(
        this.props.stateData,
        this.props.stateData.objects[
          this.props.activeState < 10
            ? `0${this.props.activeState}`
            : this.props.activeState
        ]
      );

      const path = geoPath().projection(
        geoMercator().fitSize(
          [this.props.scale.xScale, this.props.scale.yScale],
          districtsFeatures
        )
      );

      const altPath = geoPath().projection(
        geoAlbersUsa().fitSize(
          [this.props.scale.xScale, this.props.scale.yScale],
          districtsFeatures
        )
      );

      const districtShapes = districtsFeatures.features.map(d => {
        const districtId = +d.properties.CD114FP;
        if (this.props.data[districtId]) {
          const districtData = this.props.data[districtId][
            this.props.activeBucket
          ];

          const theTip =
            districtData.i > 0
              ? dataTip(
                  this.props.activeState,
                  districtId,
                  this.props.activeBucket,
                  districtData
                )
              : 'No data';

          return (
            <District
              data-tip={theTip}
              data-for="statemap"
              d={
                this.props.activeState === 2 || this.props.activeState === 15
                  ? altPath(d)
                  : path(d)
              }
              theColor={
                districtData && districtData.i
                  ? colorize(districtData.t / districtData.i, this.props.domain)
                  : '#888'
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
          <svg
            width="100%"
            viewBox={`0 0 ${this.props.scale.xScale} ${
              this.props.scale.yScale
            }`}
          >
            <BG
              data-tip
              data-for="goBack"
              height={this.props.scale.yScale}
              width={this.props.scale.xScale}
              onClick={e => this.props.updateActiveState(0)}
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
