import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-bottom: 1px solid #333;
  display: grid;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  grid-gap: 1rem;
  grid-template: auto / repeat(2, 1fr);
  justify-items: stretch;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const NavSectionHeading = styled.h2`
  border-bottom: 1px dotted #333;
  display: block;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  text-align: center;
  width: 100%;
`;

const Select = styled.select`
  font-size: 1rem;
  text-align: center;
  width: 100%;
`;

const Radio = styled.div`
  display: inline-block;
  margin: 0 0.5rem;
`;

const BucketSeclection = props => {
  return (
    <div>
      <NavSectionHeading>Choose Income Level</NavSectionHeading>
      <Select
        name="income"
        id="income"
        value={props.value}
        onChange={e => props.update(e.target.value)}
      >
        <option value="0-30">$0 - $30k</option>
        <option value="30-75">$30k - $75k</option>
        <option value="75-150">$75k - $150k</option>
        <option value="150-500">$150k - $500k</option>
        <option value="500-inf">$500k and Up</option>
      </Select>
    </div>
  );
};

const ChildrenSelection = props => {
  return (
    <div>
      <NavSectionHeading>Choose Number of Children</NavSectionHeading>
      <div style={{ textAlign: 'center' }}>
        <Radio>
          <input
            type="radio"
            name="children-0"
            id="children-0"
            value="0"
            checked={+props.value === 0}
            onChange={e => props.update(e.target.value)}
          />
          <label htmlFor="children-0">No Children</label>
        </Radio>
        <Radio>
          <input
            type="radio"
            name="children-1"
            id="children-1"
            value="1"
            checked={+props.value === 1}
            onChange={e => props.update(e.target.value)}
          />
          <label htmlFor="children-1">One Child</label>
        </Radio>
        <Radio>
          <input
            type="radio"
            name="children-2"
            id="children-2"
            value="2"
            checked={+props.value === 2}
            onChange={e => props.update(e.target.value)}
          />
          <label htmlFor="children-2">Two Children</label>
        </Radio>
      </div>
    </div>
  );
};

const Navigation = props => {
  return (
    <Container>
      <BucketSeclection
        value={props.values.activeBucket}
        update={props.updateBucket}
      />
      <ChildrenSelection
        value={props.values.activeChildren}
        update={props.updateChildren}
      />
    </Container>
  );
};

export default Navigation;
