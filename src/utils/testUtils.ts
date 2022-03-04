import { Currencies, RatesForCurrency } from "../types";

export function generateMockRates(): RatesForCurrency {
  const value = Math.random();

  const rates = Object.keys(Currencies).reduce((prev, current, index) => {
    return {
      ...prev,
      [current]: value + index,
    };
  }, {});
  return rates as RatesForCurrency;
}
