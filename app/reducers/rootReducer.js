import { combineReducers } from 'redux-immutable';
import incomes from 'reducers/incomesReducer';
import configuration from 'reducers/configurationReducer';

export default combineReducers({ incomes, configuration });
