import { connect } from 'react-redux';
import SingleIncomeEditor from 'components/SingleIncomeEditor';
import { updateIncome } from 'actions/incomesActions';

function mapStateToProps(_state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    updateIncome: (id, property, value) => dispatch(updateIncome(id, { [property]: value }))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleIncomeEditor);
