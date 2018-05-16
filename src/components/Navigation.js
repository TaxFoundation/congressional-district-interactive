import React from 'react';
import styled from 'styled-components';

const Container = styled.form`
  display: grid;
  grid-grid-template: auto / repeat(3, 1fr);
`;

const FamilySelection = props => {
  return (
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
  );
};

const StateSelection = props => {
  return <div />;
};

const DistrictSelection = props => {
  return <div />;
};

const Navigation = props => {
  return (
    <Container>
      <FamilySelection
        value={props.values.activeBucket}
        update={props.updateBucket}
      />
      <StateSelection
        value={props.values.activeState}
        update={props.updateActiveState}
      />
      <DistrictSelection />
    </Container>
  );
};

export default Navigation;
