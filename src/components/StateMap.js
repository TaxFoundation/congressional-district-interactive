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

      const bucketList = {
        '0-30': 'between $0 to $30k',
        '30-75': 'between $30k to $75k',
        '75-150': 'between $75k to $150k',
        '150-500': 'between $150k to $500k',
        '500-inf': 'above $500k',
      };

      const districtShapes = districtsFeatures.features.map(d => {
        const districtId = +d.properties.CD114FP;
        const hash = `${this.props.activeBucket}0${this.props.activeChildren}`;
        if (this.props.data[districtId]) {
          const districtData = this.props.data[districtId][hash];

          const dataTip =
            districtData.i > 0
              ? `
        <h3>
          ${
            districtId > 0
              ? `District ${districtId}`
              : this.props.activeState === 11
                ? 'District of Columbia'
                : 'At-Large District'
          }
        </h3>
        <p>Average income ${bucketList[this.props.activeBucket]} is ${formatter(
                  districtData.i,
                  '$'
                )}.</p>
        <p>Average state taxes paid is ${formatter(districtData.s, '$')}.</p>
        <p>
          Average tax ${+districtData.t > 0 ? 'increase' : 'cut'} is
          ${formatter(Math.abs(districtData.t), '$')}, or ${formatter(
                  Math.abs(districtData.t / districtData.i),
                  '%'
                )} ${+districtData.t > 0 ? 'more' : 'less'}.
        </p>
      `
              : 'No data';

          return (
            <District
              data-tip={dataTip}
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
