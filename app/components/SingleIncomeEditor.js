import React, { PropTypes } from 'react';
import AppPropTypes from 'AppPropTypes';
import parseNumber from 'lib/parseNumber';

function getExchangedAmount(income) {
  const amount = income.get('amount');
  const exchangeRate = income.get('exchangeRate');
  return (amount === '' || exchangeRate === '') ? '' : (exchangeRate * amount);
}

function SingleIncomeEditor({ income, updateIncome }) {
  const id = income.get('id');
  const exchangedAmount = getExchangedAmount(income);

  return (
    <div>
      <input
        type="text"
        value={income.get('name')}
        placeholder="name"
        onChange={(event) => updateIncome(id, 'name', event.target.value)}
        disabled
      />
      <input
        type="number"
        value={income.get('amount')}
        placeholder="amount"
        onChange={(event) => updateIncome(id, 'amount', parseNumber(event.target.value))}
      />
      <input
        type="number"
        value={income.get('exchangeRate')}
        placeholder="exchange rate"
        onChange={(event) => updateIncome(id, 'exchangeRate', parseNumber(event.target.value))}
      />
      <input
        type="number"
        value={exchangedAmount}
        readOnly
        disabled
      />
    </div>
  );
}

SingleIncomeEditor.propTypes = {
  income: AppPropTypes.income.isRequired,
  updateIncome: PropTypes.func.isRequired
};

export default SingleIncomeEditor;
