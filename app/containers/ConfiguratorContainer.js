import { connect } from 'react-redux';
import Configurator from 'components/Configurator';
import { updateUIT } from 'actions/configurationActions';

function mapStateToProps(state) {
  return {
    uit: state.getIn(['configuration', 'uit'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUIT: (value) => dispatch(updateUIT(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Configurator);
