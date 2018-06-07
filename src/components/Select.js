import styled from 'styled-components';

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAh0lEQVQ4T93TMQrCUAzG8V9x8QziiYSuXdzFC7h4AcELOPQAdXYovZCHEATlgQV5GFTe1ozJlz/kS1IpjKqw3wQBVyy++JI0y1GTe7DCBbMAckeNIQKk/BanALBB+16LtnDELoMcsM/BESDlz2heDR3WePwKSLo5eoxz3z6NNcFD+vu3ij14Aqz/DxGbKB7CAAAAAElFTkSuQmCC');
  background-repeat: no-repeat;
  background-position: 98% center;
  border: 1px solid #333;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  padding: 10px 20px;
  text-align: center;
  transition: background-color 0.1s ease-in, border 0.1s ease-in,
    color 0.1s ease-in;
  width: 100%;

  &:hover,
  &:focus {
    background-color: #e6f4ff;
    border: 1px solid #0094ff;
    color: #0094ff;
  }
`;

export default Select;
