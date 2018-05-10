import React, { Component } from 'react';
import styled from 'styled-components';

const StyledHoverContainer = styled.div`
  background-color: #fff;
  width: 300px;
`;

const HoverContainer = props => {
  return <StyledHoverContainer>{props.contents}</StyledHoverContainer>;
};

export default HoverContainer;
