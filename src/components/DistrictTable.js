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

const BackToMap = styled.p`
  color: #0094ff;
  cursor: pointer;
  font-size: 0.8rem;
  margin: 0 0 0.5rem;
  text-align: center;
`;

const ValueCell = styled.td`
  color: ${props => (props.color ? props.color : '#333')};
  font-family: 'Roboto Mono', monospace;
  text-align: right;
`;

const DistrictTable = props => {
  let theData = { i: '', s: '', t: '' };
  let bucketText = '';
  let theDistrict =
    Object.keys(props.data).length > 1 && props.activeDistrict === 0
      ? 1
      : props.activeDistrict;
  if (props.data && props.activeBucket >= 0 && props.activeDistrict >= 0) {
    theData = props.data[theDistrict][props.activeBucket];
    bucketText = BUCKETS.find(b => +b.id === +props.activeBucket).value;

    return (
      <StyledDistrictTable>
        <div>
          <BackToMap onClick={e => props.updateActiveState(0)}>
            ← Back to US Map
          </BackToMap>
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
                {/* <tr>
                  <td>Avg. State Taxes Deducted</td>
                  <ValueCell>{formatter(theData.s, '$')}</ValueCell>
                </tr> */}
              </tbody>
            </Table>
          ) : null}
        </div>
        <p>
          Not sure what district you live in? <a style={{color: '#0094ff'}} href="https://www.census.gov/mycd/" target="_blank">Find out here.</a>
        </p>
        <Button href="#" style={{ alignSelf: 'end' }}>
          Full Methodology
        </Button>
      </StyledDistrictTable>
    );
  }
};

export default DistrictTable;
