import { Map, List } from 'immutable';
import {
  ADD_INCOME, UPDATE_INCOME, DELETE_INCOME, LOAD_EMPTY_INCOMES, UPDATE_SORTED_INCOME_IDS
} from 'actions/incomesActions';
import uuid from 'uuid4';

const DEFAULT_AMOUNT = 0;
const DEFAULT_EXCHANGE_RATE = 1;

const INITIAL_STATE = Map({
  incomes: Map(),
  sortedIncomeIds: List()
});

function newPosition(state) {
  return state.get('incomes').count() + 1;
}

function addIncome(state, income) {
  const newId = uuid('income');
  const position = newPosition(state);
  const newIncome = Map(income).merge({ id: newId, position });
  return state.setIn(['incomes', newId], newIncome);
}

function sortIncomeIds(state) {
  const sortedIdsList = state.get('incomes')
    .valueSeq()
    .sortBy((income) => income.get('position'))
    .map((income) => income.get('id'))
    .toList();
  return state.set('sortedIncomeIds', sortedIdsList);
}

function updatePositions(state, sortedIncomeIds) {
  return sortedIncomeIds.reduce((newState, incomeId, index) =>
    newState.setIn(['incomes', incomeId, 'position'], index + 1)
  , state);
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_INCOME: {
      return sortIncomeIds(addIncome(state, action.income));
    }
    case UPDATE_INCOME: {
      return sortIncomeIds(state.mergeIn(['incomes', action.id], action.changes));
    }
    case DELETE_INCOME: {
      return sortIncomeIds(state.deleteIn(['incomes', action.id]));
    }
    case LOAD_EMPTY_INCOMES: {
      return sortIncomeIds(action.incomeNames.reduce(((newState, name) =>
        addIncome(newState, {
          name,
          amount: DEFAULT_AMOUNT,
          exchangeRate: DEFAULT_EXCHANGE_RATE
        })
      ), state));
    }
    case UPDATE_SORTED_INCOME_IDS: {
      const sortedIncomeIds = List(action.sortedIncomeIds);
      return updatePositions(state.set('sortedIncomeIds', sortedIncomeIds), sortedIncomeIds);
    }
    default:
      return state;
  }
}
