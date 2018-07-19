import chroma from 'chroma-js';
import { format } from 'd3-format';

export const colorize = (value, domain) => {
  return chroma
    .scale([
      '#c7e9b4',
      '#7fcdbb',
      '#41b6c4',
      '#1d91c0',
      '#225ea8',
      '#253494',
      '#421496',
      '#330963',
      '#210433',
    ])
    .domain(domain)(value);
};

export const formatter = (number, type) => {
  if (type === '%') {
    return format('.1%')(number);
  } else if (type === '$' && number % 1 > 0) {
    return format('$,.2f')(number);
  } else if (type === '$') {
    return format('$,')(number);
  } else if (type === ',') {
    return format(',.0f')(number);
  }
};
