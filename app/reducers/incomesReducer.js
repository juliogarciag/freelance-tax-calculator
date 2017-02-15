import { Map } from 'immutable';

const INITIAL_STATE = Map({
  incomes: Map()
});

export default function(state = INITIAL_STATE, _action) {
  return state;
}
