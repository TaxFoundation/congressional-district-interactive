import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const StyledHoverContainer = styled(ReactTooltip)`
  background-color: #fff !important;
  color: #333 !important;
  max-width: 300px !important;

  &.place-top {
    &:after {
      border-top-color: #fff !important;
      border-top-style: solid !important;
      border-top-width: 6px !important;
    }
  }
`;

const HoverContainer = props => {
  return (
    <StyledHoverContainer {...props}>{props.children}</StyledHoverContainer>
  );
};

export default HoverContainer;
