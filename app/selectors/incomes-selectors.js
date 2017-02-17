import { createSelector } from 'reselect';

const incomesSelector = (state) => state.getIn(['incomes', 'incomes']);
const sortedIncomeIdsSelector = (state) => state.getIn(['incomes', 'sortedIncomeIds']);

const getSortedIncomes = createSelector(
  [sortedIncomeIdsSelector, incomesSelector],
  (sortedIncomeIds = [], incomesMap) =>
    sortedIncomeIds.map((incomeId) => incomesMap.get(incomeId)).toList()
);

export { getSortedIncomes, sortedIncomeIdsSelector, incomesSelector };
