import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const StyledHoverContainer = styled(ReactTooltip)`
  background-color: #fff !important;
  color: #333 !important;
  font-family: 'Lato', sans-serif !important;
  font-size: 1rem !important;
  max-width: 300px !important;

  &.place-bottom {
    &:after {
      border-bottom-color: #fff !important;
      border-bottom-style: solid !important;
      border-bottom-width: 6px !important;
    }
  }

  &.place-left {
    &:after {
      border-left-color: #fff !important;
      border-left-style: solid !important;
      border-left-width: 6px !important;
    }
  }

  &.place-right {
    &:after {
      border-right-color: #fff !important;
      border-right-style: solid !important;
      border-right-width: 6px !important;
    }
  }

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
