import styled from 'styled-components';

const Button = styled.p`
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  margin: 0 auto;
  max-width: 300px;
  padding: 0.5rem;
  text-align: center;
  transition: background-color 0.1s ease-in, border 0.1s ease-in,
    color 0.1s ease-in, font-weight 0.1s ease-in;

  &:hover {
    background-color: #e6f4ff;
    border: 1px solid #0094ff;
    color: #0094ff;
    font-weight: 700;
  }
`;

export default Button;
