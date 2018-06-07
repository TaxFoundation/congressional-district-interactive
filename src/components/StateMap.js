import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { geoAlbersUsa, geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import HoverContainer from './HoverContainer';
import DistrictTable from './DistrictTable';
import Button from './Button';
import Select from './Select';
import { colorize } from '../helpers';

const Container = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template: repeat(2, auto) / auto;

  @media (min-width: 800px) {
    grid-template: auto / 3fr 1fr;
  }
`;

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
  state = {
    activeDistrict: 0,
    data: null,
  };

  updateActiveDistrict = id =>
    this.setState({
      activeDistrict: id,
      data: this.props.data[id][this.props.activeBucket],
    });

  componentDidMount() {
    console.log(this.buckets);
    let activeDistrict = 0;
    if (Object.keys(this.props.data).length > 1) {
      activeDistrict = 1;
      this.updateActiveDistrict(activeDistrict);
    }
    this.setState({
      data: this.props.data[activeDistrict][this.props.activeBucket],
    });
  }

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

          return (
            <District
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
              onMouseOver={e =>
                districtId > 0 ? this.updateActiveDistrict(districtId) : null
              }
            />
          );
        } else {
          return null;
        }
      });

      return (
        <Fragment>
          <Container>
            <svg
              width="100%"
              viewBox={`0 0 ${this.props.scale.xScale} ${
                this.props.scale.yScale
              }`}
            >
              <BG
                height={this.props.scale.yScale}
                width={this.props.scale.xScale}
                onClick={e => this.props.updateActiveState(0)}
              />
              {districtShapes}
            </svg>
            <DistrictTable
              data={this.props.data}
              activeBucket={this.props.activeBucket}
              activeState={this.props.activeState}
              activeDistrict={this.state.activeDistrict}
              updateActiveDistrict={this.updateActiveDistrict}
              updateActiveState={this.props.updateActiveState}
            />
          </Container>
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
