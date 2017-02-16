import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import IncomesEditor from 'components/IncomesEditor';
import { loadEmptyIncomes } from 'actions/incomesActions';
import AppPropTypes from 'AppPropTypes';
import { getSortedIncomes } from 'selectors/incomes-selectors';

const EMPTY_INCOME_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

class IncomesEditorContainer extends Component {
  componentWillMount() {
    if (this.props.incomes.count() === 0) {
      this.props.loadEmptyIncomes(EMPTY_INCOME_NAMES);
    }
  }

  render() {
    return <IncomesEditor incomes={this.props.incomes} />;
  }
}

IncomesEditorContainer.propTypes = {
  loadEmptyIncomes: PropTypes.func.isRequired,
  incomes: AppPropTypes.listOfIncomes.isRequired
};

function mapStateToProps(state) {
  return { incomes: getSortedIncomes(state) };
}

function mapDispatchToProps(dispatch) {
  return {
    loadEmptyIncomes: (names) => dispatch(loadEmptyIncomes(names))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomesEditorContainer);
