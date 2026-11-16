/**
 * Format a number into Indian Rupees (INR) currency format: ₹XX,XXX.XX
 * @param {number} amount
 * @param {boolean} hideDecimals
 * @returns {string}
 */
export const formatINR = (amount, hideDecimals = false) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0.00';
  }
  const num = Number(amount);
  if (hideDecimals && num % 1 === 0) {
    return '₹' + num.toLocaleString('en-IN');
  }
  return (
    '₹' +
    num.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
};

export const CURRENCY_SYMBOL = '₹';
