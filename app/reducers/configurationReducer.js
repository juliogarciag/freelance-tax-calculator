import { Map } from 'immutable';
import { UPDATE_UIT } from 'actions/configurationActions';

const INITIAL_STATE = Map({
  uit: 3950
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_UIT:
      return state.set('uit', action.value);
    default:
      return state;
  }
}
