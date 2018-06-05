import React from 'react';
import styled from 'styled-components';
import STATES from '../data/states';

const Container = styled.div`
  border-bottom: 1px solid #aaa;
  display: grid;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  grid-gap: 1rem;
  grid-template: auto / repeat(2, 1fr);
  justify-items: stretch;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    grid-template: repeat(2, auto) / auto;
  }
`;

const NavSectionHeading = styled.h2`
  display: block;
  font-size: 1.4rem;
  line-height: 1.4;
  margin: 0 0 1rem;
  text-align: center;
  width: 100%;
`;

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAh0lEQVQ4T93TMQrCUAzG8V9x8QziiYSuXdzFC7h4AcELOPQAdXYovZCHEATlgQV5GFTe1ozJlz/kS1IpjKqw3wQBVyy++JI0y1GTe7DCBbMAckeNIQKk/BanALBB+16LtnDELoMcsM/BESDlz2heDR3WePwKSLo5eoxz3z6NNcFD+vu3ij14Aqz/DxGbKB7CAAAAAElFTkSuQmCC');
  background-repeat: no-repeat;
  background-position: 98% center;
  border: 1px solid #333;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  padding: 10px 20px;
  text-align: center;
  width: 100%;

  &:focus {
    border: 1px solid #0094ff;
  }
`;

const BucketSeclection = props => {
  return (
    <div>
      <NavSectionHeading>Choose Income Level</NavSectionHeading>
      <div>
        <Select
          name="income"
          id="income"
          value={props.value}
          onChange={e => props.update(e.target.value)}
        >
          {props.buckets.map(b => (
            <option key={`bucket-${b.id}`} value={b.id}>
              {b.value}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

const USStateSelection = props => {
  return (
    <div>
      <NavSectionHeading>Choose a State</NavSectionHeading>
      <div>
        <Select
          name="theState"
          id="theState"
          value={props.value}
          onChange={e => props.update(e.target.value)}
        >
          <option value="0">No State Selected</option>
          {STATES.map(s => (
            <option key={`theState-${s.id}`} value={s.id}>
              {s.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

const Navigation = props => {
  return (
    <Container>
      <BucketSeclection
        buckets={props.buckets}
        value={props.values.activeBucket}
        update={props.updateBucket}
      />
      <USStateSelection
        value={props.values.activeState}
        update={props.updateActiveState}
      />
    </Container>
  );
};

export default Navigation;
