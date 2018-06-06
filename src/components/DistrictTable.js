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
          <table>
            <tbody>
              <tr>
                <td>Avg. Tax Cut</td>
                <td>{formatter(theData.t, '$')}</td>
              </tr>
              <tr>
                <td>Avg. Tax Cut as % of Income</td>
                <td>{formatter(theData.t / theData.i, '%')}</td>
              </tr>
              <tr>
                <td>{`Avg. Income from ${bucketText}`}</td>
                <td>{formatter(theData.i, '$')}</td>
              </tr>
            </tbody>
          </table>
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
