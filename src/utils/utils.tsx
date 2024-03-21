const formatAmount = (amount: number) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const utils = {
  formatAmount,
};

export default utils;
