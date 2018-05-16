import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template: auto / repeat(3, 1fr);
  justify-items: center;
`;

const BucketSeclection = props => {
  return (
    <div>
      <p>Choose Income Level</p>
      <select
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
      </select>
    </div>
  );
};

const StatusSelection = props => {
  return (
    <div>
      <p>Choose Filing Status</p>
      <div>
        <input
          type="radio"
          name="single-status"
          id="single-status"
          value="0"
          checked={+props.value === 0}
          onChange={e => props.update(e.target.value)}
        />
        <label htmlFor="single-status">Filing Single</label>
        <input
          type="radio"
          name="married-status"
          id="married-status"
          value="1"
          checked={+props.value === 1}
          onChange={e => props.update(e.target.value)}
        />
        <label htmlFor="married--status">Filing Jointly</label>
      </div>
    </div>
  );
};

const ChildrenSelection = props => {
  return (
    <div>
      <p>Choose Number of Children</p>
      <div>
        <input
          type="radio"
          name="children-0"
          id="children-0"
          value="0"
          checked={+props.value === 0}
          onChange={e => props.update(e.target.value)}
        />
        <label htmlFor="children-0">No Children</label>
        <input
          type="radio"
          name="children-1"
          id="children-1"
          value="1"
          checked={+props.value === 1}
          onChange={e => props.update(e.target.value)}
        />
        <label htmlFor="children-1">One Child</label>
        <input
          type="radio"
          name="children-2"
          id="children-2"
          value="2"
          checked={+props.value === 2}
          onChange={e => props.update(e.target.value)}
        />
        <label htmlFor="children-2">Two Children</label>
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
      <StatusSelection
        value={props.values.activeStatus}
        update={props.updateStatus}
      />
      <ChildrenSelection
        value={props.values.activeChildren}
        update={props.updateChildren}
      />
    </Container>
  );
};

export default Navigation;
