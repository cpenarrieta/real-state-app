export const formatNumber = (num: number = 0) => {
  return new Intl.NumberFormat("en-us").format(num)
}