import React from 'react';
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
  font-family: 'Roboto Mono', monospace;
  text-align: right;
`;

const DistrictTable = props => {
  let theData = { i: '', s: '', t: '' };
  let bucketText = '';
  if (props.data && props.activeBucket && props.activeDistrict) {
    theData = props.data[props.activeDistrict][props.activeBucket];
    bucketText = BUCKETS.find(b => +b.id === +props.activeBucket).value;
  }

  return (
    <StyledDistrictTable>
      <div>
        {Object.keys(props.data).length > 1 ? (
          <Select
            name="district"
            id="district"
            value={props.activeDistrict}
            onChange={e => props.updateActiveDistrict(e.target.value)}
          >
            {Object.keys(props.data).map(d => (
              <option key={`district-opt-${d}`} value={+d}>
                {`District ${d}`}
              </option>
            ))}
          </Select>
        ) : props.activeState === 11 ? (
          <h3 style={{ textAlign: 'center' }}>District of Columbia</h3>
        ) : (
          <h3 style={{ textAlign: 'center' }}>At-Large District</h3>
        )}
        {theData ? (
          <Table>
            <tbody>
              <tr>
                <td>Avg. Tax Cut</td>
                <ValueCell>{formatter(theData.t, '$')}</ValueCell>
              </tr>
              <tr>
                <td>Avg. Tax Cut as % of Income</td>
                <ValueCell>{formatter(theData.t / theData.i, '%')}</ValueCell>
              </tr>
              <tr>
                <td>{`Avg. Income from ${bucketText}`}</td>
                <ValueCell>{formatter(theData.i, '$')}</ValueCell>
              </tr>
              <tr>
                <td>Avg. State Taxes Paid</td>
                <ValueCell>{formatter(theData.s, '$')}</ValueCell>
              </tr>
            </tbody>
          </Table>
        ) : null}
      </div>
      <Button
        style={{ alignSelf: 'end' }}
        onClick={e => props.updateActiveState(0)}
      >
        Go Back to US Map
      </Button>
    </StyledDistrictTable>
  );
};

export default DistrictTable;
