import styled from 'styled-components';

const Button = styled.a`
  background-color: #0094ff;
  border: 1px solid #0094ff;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin: 0 auto;
  max-width: 300px;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.1s ease-in, border 0.1s ease-in,
    color 0.1s ease-in, font-weight 0.1s ease-in;

  &:focus,
  &:hover {
    background-color: #e6f4ff;
    border: 1px solid #0094ff;
    color: #0094ff;
    font-weight: 700;
  }
`;

export default Button;
