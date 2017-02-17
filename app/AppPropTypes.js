import { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const { number, string, oneOfType, oneOf } = PropTypes;
const { mapContains, mapOf, listOf } = ImmutablePropTypes;

const emptyString = oneOf(['']);
const optionalNumber = oneOfType([number, emptyString]);

const income = mapContains({
  id: string.isRequired,
  amount: optionalNumber,
  exchangeRate: optionalNumber,
  name: string,
  position: number.isRequired
});
const mapOfIncomes = mapOf(income.isRequired, string.isRequired);
const listOfIncomes = listOf(income.isRequired);

export default { income, mapOfIncomes, listOfIncomes, optionalNumber };
