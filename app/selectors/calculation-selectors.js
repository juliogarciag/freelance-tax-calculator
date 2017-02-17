import { createSelector } from 'reselect';
import { incomesSelector } from 'selectors/incomes-selectors';

const ITF = 2;

function calculateRateScales(uit) {
  return [
    { limit: 5 * uit, rate: 0.08 },
    { limit: 20 * uit, rate: 0.14 },
    { limit: 35 * uit, rate: 0.17 },
    { limit: 45 * uit, rate: 0.2 },
    { limit: Infinity, rate: 0.3 }
  ];
}

function calculateGrossRent(incomes) {
  return Math.trunc(incomes.reduce((total, income) => {
    const amount = income.get('amount');
    const exchangeRate = income.get('exchangeRate');
    return total + (amount * exchangeRate);
  }, 0));
}

function calculateFirstDeduction(grossRent, uit) {
  return Math.round(Math.min(grossRent * 0.2, 24 * uit));
}

/* eslint-disable no-restricted-syntax */
function calculateIncomeTax(taxableIncome, rateScales) {
  let taxes = 0;
  let deductibleIncome = taxableIncome;

  for (const { limit, rate } of rateScales) {
    const incomeInScale = Math.min(deductibleIncome, limit);
    taxes += rate * incomeInScale;
    deductibleIncome -= incomeInScale;

    if (deductibleIncome <= 0) {
      break;
    }
  }

  return Math.trunc(taxes);
}
/* eslint-enable no-restricted-syntax */

const uitSelector = (state) => state.getIn(['configuration', 'uit']);

const calculateTaxResults = createSelector(
  [incomesSelector, uitSelector],
  (incomesMap, uit) => {
    const incomes = incomesMap.valueSeq();
    const grossRent = calculateGrossRent(incomes);
    const annualRetention = grossRent * 0.08;
    const firstDeduction = calculateFirstDeduction(grossRent, uit);
    const fullRent = grossRent - firstDeduction;
    const secondDeduction = 7 * uit;
    const netIncome = Math.max(fullRent - secondDeduction, 0);
    const itf = ITF;
    const taxableIncome = Math.max(netIncome - itf, 0);
    const rateScales = calculateRateScales(uit);
    const incomeTax = calculateIncomeTax(taxableIncome, rateScales);
    const realTaxRate = grossRent === 0 ? 0 : (incomeTax / grossRent);
    const balanceWithRetention = Math.round(incomeTax - annualRetention);

    return {
      grossRent,
      annualRetention,
      firstDeduction,
      fullRent,
      secondDeduction,
      netIncome,
      itf,
      taxableIncome,
      incomeTax,
      realTaxRate,
      balanceWithRetention
    };
  }
);

export { calculateTaxResults };
