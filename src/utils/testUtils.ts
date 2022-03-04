import { Item } from "../domain/converter/hooks/useHistory";
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

export function generateMockHistoryItem(): Item {
  const mockItem: Item = {
    amount: 1,
    from: "EUR",
    to: "USD",
    result: 2,
    timestamp: new Date().getTime(),
  };
  return mockItem;
}
