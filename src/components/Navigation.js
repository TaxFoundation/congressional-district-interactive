import React from 'react';
import styled from 'styled-components';
import HoverContainer from './HoverContainer';
import Select from './Select';
import BUCKETS from '../data/buckets.js';
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

const BucketSeclection = props => {
  return (
    <div>
      <NavSectionHeading>
        Choose{' '}
        <span data-for="agi-label" data-tip>
          AGI
        </span>{' '}
        Range
      </NavSectionHeading>
      <div>
        <Select
          name="income"
          id="income"
          value={props.value}
          onChange={e => props.update(e.target.value)}
        >
          {BUCKETS.map(b => (
            <option key={`bucket-${b.id}`} value={b.id}>
              {b.value}
            </option>
          ))}
        </Select>
      </div>
      <HoverContainer id="agi-label">Adjusted Gross Income</HoverContainer>
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
