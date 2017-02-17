export const ADD_INCOME = 'incomes/ADD_INCOME';
export const UPDATE_INCOME = 'incomes/UPDATE_INCOME';
export const DELETE_INCOME = 'incomes/DELETE_INCOME';
export const LOAD_EMPTY_INCOMES = 'incomes/LOAD_EMPTY_INCOMES';
export const UPDATE_SORTED_INCOME_IDS = 'incomes/UPDATE_SORTED_INCOME_IDS';

export function addIncome(income) {
  return { type: ADD_INCOME, income };
}

export function updateIncome(id, changes) {
  return { type: UPDATE_INCOME, id, changes };
}

export function deleteIncome(id) {
  return { type: DELETE_INCOME, id };
}

export function loadEmptyIncomes(incomeNames) {
  return { type: LOAD_EMPTY_INCOMES, incomeNames };
}

export function updateSortedIncomeIds(sortedIncomeIds) {
  return { type: UPDATE_SORTED_INCOME_IDS, sortedIncomeIds };
}
