import { createSelector } from 'reselect';
import { incomesSelector } from 'selectors/incomes-selectors';

// TODO: Move UIT to an input
const UIT = 3950;
const ITF = 2;
const RATE_SCALES = [
  { limit: 5 * UIT, rate: 0.08 },
  { limit: 20 * UIT, rate: 0.14 },
  { limit: 35 * UIT, rate: 0.17 },
  { limit: 45 * UIT, rate: 0.2 },
  { limit: Infinity, rate: 0.3 }
];

function calculateGrossRent(incomes) {
  return Math.trunc(incomes.reduce((total, income) => {
    const amount = income.get('amount');
    const exchangeRate = income.get('exchangeRate');
    return total + (amount * exchangeRate);
  }, 0));
}

function calculateFirstDeduction(grossRent) {
  return Math.round(grossRent * 0.2);
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
      return taxes;
    }
  }

  return taxes;
}
/* eslint-enable no-restricted-syntax */

const calculateTaxResults = createSelector(
  [incomesSelector],
  (incomesMap) => {
    const incomes = incomesMap.valueSeq();
    const grossRent = calculateGrossRent(incomes);
    const annualRetention = grossRent * 0.08;
    const firstDeduction = calculateFirstDeduction(grossRent);
    const fullRent = grossRent - firstDeduction;
    const secondDeduction = 7 * UIT;
    const netIncome = Math.max(fullRent - secondDeduction, 0);
    const itf = ITF;
    const taxableIncome = Math.max(netIncome - itf, 0);
    const incomeTax = calculateIncomeTax(taxableIncome, RATE_SCALES);

    return {
      grossRent,
      annualRetention,
      firstDeduction,
      fullRent,
      secondDeduction,
      netIncome,
      itf,
      taxableIncome,
      incomeTax
    };
  }
);

export { calculateTaxResults };
