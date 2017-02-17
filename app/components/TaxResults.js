import React, { PropTypes } from 'react';

function TaxResults(props) {
  const {
    grossRent, annualRetention, firstDeduction, fullRent, secondDeduction, netIncome, itf,
    taxableIncome, incomeTax, balanceWithRetention
  } = props;

  return (
    <div>
      <pre>Renta Bruta (PEN): {grossRent}</pre>
      <pre>Retención Anual (8%, PEN): {annualRetention}</pre>
      <pre>Primera Deducción (20%, PEN): {firstDeduction}</pre>
      <pre>Renta Total (PEN): {fullRent}</pre>
      <pre>Segunda Deducción (7 UIT, PEN): {secondDeduction}</pre>
      <pre>Renta Neta (PEN): {netIncome}</pre>
      <pre>ITF (PEN): {itf}</pre>
      <pre>Renta Imponible (PEN): {taxableIncome}</pre>
      <pre>Impuesto a la Renta (PEN): {incomeTax}</pre>
      <pre>Balance con Retenciones (PEN): {balanceWithRetention}</pre>
    </div>
  );
}

TaxResults.propTypes = {
  grossRent: PropTypes.number.isRequired,
  annualRetention: PropTypes.number.isRequired,
  firstDeduction: PropTypes.number.isRequired,
  fullRent: PropTypes.number.isRequired,
  secondDeduction: PropTypes.number.isRequired,
  netIncome: PropTypes.number.isRequired,
  itf: PropTypes.number.isRequired,
  taxableIncome: PropTypes.number.isRequired,
  incomeTax: PropTypes.number.isRequired,
  balanceWithRetention: PropTypes.number.isRequired
};

export default TaxResults;
