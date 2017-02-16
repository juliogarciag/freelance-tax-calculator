import numeral from 'numeral';
import isNil from 'lodash/isNil';

export default function parseNumber(text) {
  const parsed = numeral(text).value();
  return isNil(parsed) ? '' : parsed;
}
