export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-us").format(price);
};
