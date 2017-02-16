import { createSelector } from 'reselect';

const incomesSelector = (state) => state.getIn(['incomes', 'incomes']);

const getSortedIncomes = createSelector(
  [incomesSelector],
  (incomesMap) => {
    const incomes = incomesMap.valueSeq();
    return incomes.sortBy((income) => income.get('position')).toList();
  }
);

export { getSortedIncomes, incomesSelector };
