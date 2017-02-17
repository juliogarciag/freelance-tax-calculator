import { createSelector } from 'reselect';
import { List } from 'immutable';

const incomesSelector = (state) => state.getIn(['incomes', 'incomes']);
const sortedIncomeIdsSelector = (state) => state.getIn(['incomes', 'sortedIncomeIds']);

const getSortedIncomes = createSelector(
  [sortedIncomeIdsSelector, incomesSelector],
  (sortedIncomeIds = List(), incomesMap) =>
    sortedIncomeIds.map((incomeId) => incomesMap.get(incomeId)).toList()
);

export { getSortedIncomes, sortedIncomeIdsSelector, incomesSelector };
