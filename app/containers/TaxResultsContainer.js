import { connect } from 'react-redux';
import TaxResults from 'components/TaxResults';
import { calculateTaxResults } from 'selectors/calculation-selectors';

function mapStateToProps(state) {
  const results = calculateTaxResults(state);

  return {
    grossRent: results.grossRent,
    annualRetention: results.annualRetention,
    firstDeduction: results.firstDeduction,
    fullRent: results.fullRent,
    secondDeduction: results.secondDeduction,
    netIncome: results.netIncome,
    itf: results.itf,
    taxableIncome: results.taxableIncome,
    incomeTax: results.incomeTax
  };
}

function mapDispatchToProps(_dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxResults);
