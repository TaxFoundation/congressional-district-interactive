import chroma from 'chroma-js';
import { format } from 'd3-format';

export const colorize = (value, domain) => {
  return chroma.scale('PiYG').domain(domain)(-value);
};

export const formatter = number => {
  return format('$,')(number);
};
