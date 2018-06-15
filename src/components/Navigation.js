import React from 'react';
import styled from 'styled-components';
import HoverContainer from './HoverContainer';
import Select from './Select';
import BUCKETS from '../data/buckets.js';
import STATES from '../data/states';

const Container = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #aaa;
  border-radius: 4px;
  display: grid;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  grid-gap: 1rem;
  grid-template: auto / repeat(2, 1fr);
  justify-items: stretch;
  padding: 1rem;
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

const Tooltip = styled.span`
  background-color: #e6f4ff;
  border: 1px solid #0094ff;
  border-radius: 2px;
  color: #0094ff;
  cursor: pointer;
  display: inline-block;
  font-size: 0.8rem;
  line-height: 1;
  margin-left: 0.5rem;
  padding: 0.1rem 0.3rem;
  position: relative;
  top: -0.25rem;
`;

const BucketSeclection = props => {
  return (
    <div>
      <NavSectionHeading>
        Choose AGI Range{' '}
        <Tooltip data-for="agi-label" data-tip>
          ?
        </Tooltip>
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
      <HoverContainer place="bottom" id="agi-label">
        Adjusted Gross Income: your gross income minus certain deductions, such
        as education expenses and health savings account contributions.
      </HoverContainer>
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
