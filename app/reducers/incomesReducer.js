import { Map } from 'immutable';
import {
  ADD_INCOME, UPDATE_INCOME, DELETE_INCOME, LOAD_EMPTY_INCOMES
} from 'actions/incomesActions';
import uuid from 'uuid4';

const DEFAULT_AMOUNT = 0;
const DEFAULT_EXCHANGE_RATE = 1;

const INITIAL_STATE = Map({
  incomes: Map()
});

function newPosition(state) {
  return state.get('incomes').count() + 1;
}

function addIncome(state, income) {
  const newId = uuid('income');
  const newIncome = Map(income).merge({ id: newId, position: newPosition(state) });
  return state.setIn(['incomes', newId], newIncome);
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_INCOME: {
      return addIncome(state, action.income);
    }
    case UPDATE_INCOME: {
      return state.mergeIn(['incomes', action.id], action.changes);
    }
    case DELETE_INCOME: {
      return state.deleteIn(['incomes', action.id]);
    }
    case LOAD_EMPTY_INCOMES: {
      return action.incomeNames.reduce(((newState, name) =>
        addIncome(newState, {
          name,
          amount: DEFAULT_AMOUNT,
          exchangeRate: DEFAULT_EXCHANGE_RATE
        })
      ), state);
    }
    default:
      return state;
  }
}
