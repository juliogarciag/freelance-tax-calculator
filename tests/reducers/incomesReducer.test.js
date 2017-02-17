import { List } from 'immutable';
import incomesReducer from 'reducers/incomesReducer';
import {
  addIncome, updateIncome, deleteIncome, loadEmptyIncomes
} from 'actions/incomesActions';

const incomeByName = (state, name) =>
  state.get('incomes').find((income) => income.get('name') === name);

describe('ADD_INCOME', () => {
  let newState;

  beforeEach(() => {
    newState = incomesReducer(undefined, addIncome({
      amount: 100,
      name: 'Some Income'
    }));
  });

  it('adds the income to the reducer', () => {
    expect(newState.get('incomes').count()).toEqual(1);
    expect(newState.get('incomes').first().get('amount')).toEqual(100);
    expect(newState.get('incomes').first().get('name')).toEqual('Some Income');
  });

  it('adds the one with the position = 1', () => {
    expect(newState.get('incomes').first().get('position')).toEqual(1);
  });

  it('keeps an array with the sorted income ids with just this element', () => {
    const newIncome = newState.get('incomes').first();
    expect(newState.get('sortedIncomeIds').first()).toEqual(newIncome.get('id'));
  });
});

describe('UPDATE_INCOME', () => {
  it('updates the old income', () => {
    const oldState = incomesReducer(undefined, addIncome({
      amount: 100,
      name: 'Some Income'
    }));
    const income = oldState.get('incomes').valueSeq().first();
    const newState = incomesReducer(oldState, updateIncome(income.get('id'), {
      amount: 120
    }));
    expect(newState.get('incomes').first().get('amount')).toEqual(120);
  });
});

describe('DELETE_INCOME', () => {
  it('deletes the old income', () => {
    const oldState = incomesReducer(undefined, addIncome({
      amount: 100,
      name: 'Some Income'
    }));
    const income = oldState.get('incomes').valueSeq().first();
    const newState = incomesReducer(oldState, deleteIncome(income.get('id')));
    expect(newState.get('incomes').count()).toEqual(0);
  });
});

describe('LOAD_EMPTY_INCOMES', () => {
  let newState;

  beforeEach(() => {
    newState = incomesReducer(undefined, loadEmptyIncomes([
      'january', 'february'
    ]));
  });

  it('loads as many empty incomes as given names', () => {
    expect(newState.get('incomes').count()).toEqual(2);
  });

  it('sets the initial amount as 0', () => {
    expect(newState.get('incomes').first().get('amount')).toEqual(0);
  });

  it('sets the exchangeRate as 1', () => {
    expect(newState.get('incomes').first().get('exchangeRate')).toEqual(1);
  });

  it('sets the correct positions', () => {
    const januaryIncome = incomeByName(newState, 'january');
    const februaryIncome = incomeByName(newState, 'february');

    expect(januaryIncome.get('position')).toEqual(1);
    expect(februaryIncome.get('position')).toEqual(2);
    expect(newState.get('sortedIncomeIds')).toEqual(
      List([januaryIncome.get('id'), februaryIncome.get('id')])
    );
  });
});
