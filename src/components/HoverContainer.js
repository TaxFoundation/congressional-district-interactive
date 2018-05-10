import React, { Component } from 'react';
import styled from 'styled-components';

const StyledHoverContainer = styled.div`
  background-color: #fff;
  display: ${props => (props.active ? 'block' : 'none')};
  position: fixed;
  top: ${props => props.y}px;
  width: 300px;
  z-index: 100;
`;

const HoverContainer = props => {
  return (
    <StyledHoverContainer {...props}>{props.children}</StyledHoverContainer>
  );
};

export default HoverContainer;
