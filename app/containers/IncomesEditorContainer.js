import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import IncomesEditor from 'components/IncomesEditor';
import { loadEmptyIncomes, updateSortedIncomeIds } from 'actions/incomesActions';
import AppPropTypes from 'AppPropTypes';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { getSortedIncomes, sortedIncomeIdsSelector } from 'selectors/incomes-selectors';
import { arrayMove } from 'react-sortable-hoc';

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
    const { incomes, sortedIncomeIds, onSortEnd } = this.props;
    return (
      <IncomesEditor
        incomes={incomes}
        onSortEnd={({ oldIndex, newIndex }) => onSortEnd(sortedIncomeIds, oldIndex, newIndex)}
      />
    );
  }
}

IncomesEditorContainer.propTypes = {
  loadEmptyIncomes: PropTypes.func.isRequired,
  incomes: AppPropTypes.listOfIncomes.isRequired,
  sortedIncomeIds: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  onSortEnd: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    incomes: getSortedIncomes(state),
    sortedIncomeIds: sortedIncomeIdsSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadEmptyIncomes: (names) => dispatch(loadEmptyIncomes(names)),
    onSortEnd: (sortedIncomeIds, oldIndex, newIndex) => {
      const newOrder = arrayMove(sortedIncomeIds.toArray(), oldIndex, newIndex);
      dispatch(updateSortedIncomeIds(newOrder));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomesEditorContainer);
