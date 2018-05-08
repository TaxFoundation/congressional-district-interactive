import chroma from 'chroma-js';

export const colorize = (value, domain) => {
  return chroma.scale('PiYG').domain(domain)(value);
};
