const convert = (valueToRub, currencyInfo) => (
  ((valueToRub / currencyInfo.Value) * currencyInfo.Nominal).toFixed(4)
);

export default convert;
