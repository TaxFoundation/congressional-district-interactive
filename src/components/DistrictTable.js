import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Select from './Select';
import { formatter } from '../helpers';
import BUCKETS from '../data/buckets';

const StyledDistrictTable = styled.div`
  border: 1px solid #999;
  border-radius: 4px;
  display: grid;
  grid-gap: 0.5rem;
  height: 100%;
  padding: 1rem;
`;

const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.8rem;
  width: 100%;

  tr:first-child {
    font-size: 1.2rem;
  }

  tr > td {
    border-bottom: 1px solid #ccc;
    padding: 0.5rem 0;

    &:last-child {
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
  }

  tr:last-child > td {
    border: none;
  }
`;

const ValueCell = styled.td`
  color: ${props => (props.color ? props.color : '#333')};
  font-family: 'Roboto Mono', monospace;
  text-align: right;
`;

class DistrictTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let theData = { i: '', s: '', t: '' };
    let bucketText = '';
    let theDistrict =
      Object.keys(this.props.data).length > 1 && this.props.activeDistrict === 0
        ? 1
        : this.props.activeDistrict;
    if (
      this.props.data &&
      this.props.activeBucket >= 0 &&
      this.props.activeDistrict >= 0
    ) {
      theData = this.props.data[theDistrict][this.props.activeBucket];
      bucketText = BUCKETS.find(b => +b.id === +this.props.activeBucket).value;
    }

    return (
      <StyledDistrictTable>
        <div>
          {Object.keys(this.props.data).length > 1 ? (
            <Select
              name="district"
              id="district"
              value={this.props.activeDistrict}
              onChange={e => this.props.updateActiveDistrict(e.target.value)}
            >
              {Object.keys(this.props.data).map(d => (
                <option key={`district-opt-${d}`} value={+d}>
                  {`District ${d}`}
                </option>
              ))}
            </Select>
          ) : this.props.activeState === 11 ? (
            <h3 style={{ textAlign: 'center' }}>District of Columbia</h3>
          ) : (
            <h3 style={{ textAlign: 'center' }}>At-Large District</h3>
          )}
          {theData ? (
            <Table>
              <tbody>
                <tr>
                  <td>Avg. Tax Cut</td>
                  <ValueCell color={theData.t >= 0 ? '#00aa22' : '#ef4438'}>
                    {formatter(theData.t, '$')}
                  </ValueCell>
                </tr>
                <tr>
                  <td>Avg. Tax Cut as % of Income</td>
                  <ValueCell color={theData.t >= 0 ? '#00aa22' : '#ef4438'}>
                    {formatter(theData.t / theData.i, '%')}
                  </ValueCell>
                </tr>
                <tr>
                  <td>{`Avg. Income from ${bucketText}`}</td>
                  <ValueCell>{formatter(theData.i, '$')}</ValueCell>
                </tr>
                <tr>
                  <td>Avg. State Taxes Deducted</td>
                  <ValueCell>{formatter(theData.s, '$')}</ValueCell>
                </tr>
              </tbody>
            </Table>
          ) : null}
        </div>
        <Button
          style={{ alignSelf: 'end' }}
          onClick={e => this.props.updateActiveState(0)}
        >
          Go Back to US Map
        </Button>
      </StyledDistrictTable>
    );
  }
}

export default DistrictTable;
