import React from 'react';
import styled from 'styled-components';

const HoverContainer = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
`;

const Heading = styled.h3`
  border-bottom: 1px solid #333;
  font-size: 1.2rem;
`;

const DistrictHoverContent = props => (
  <HoverContainer>
    <Heading>
      {+props.name > 0 ? `District ${props.name}` : 'At-large District'}
    </Heading>
    <p>{`Average Income is ${props.income}`}</p>
    <p>{`Average state taxes paid is ${props.stateTax}`}</p>
    <p>{`Average tax ${+props.taxDelta > 0 ? 'increase' : 'cut'} is ${Math.abs(
      props.taxDelta
    )}`}</p>
  </HoverContainer>
);

export default DistrictHoverContent;
