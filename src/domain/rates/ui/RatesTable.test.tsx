import React from "react";
import { render, screen } from "@testing-library/react";
import RatesTable from "./RatesTable";
import { CurrencyCodes, RatesForCurrency } from "../../../types";
import { generateMockRates } from "../../../utils/testUtils";

const rates = generateMockRates();

describe("RatesTable", () => {
  it("renders table header", () => {
    render(<RatesTable rates={rates as RatesForCurrency} />);

    expect(screen.getByText("Currency")).toBeVisible();
    expect(screen.getByText("Exchange rate")).toBeVisible();
  });

  it("renders rates", () => {
    render(<RatesTable rates={rates as RatesForCurrency} />);

    Object.entries<number>(rates).forEach(([currency, value]) => {
      expect(screen.getByText(currency)).toBeVisible();
      expect(screen.getByText(value.toFixed(2))).toBeVisible();
    });
  });

  it("renders rates change", () => {
    const currencyForTest = Object.keys(rates)[0];
    const defaultValue = rates[currencyForTest as CurrencyCodes];

    const getValueColor = (currency: CurrencyCodes): string => {
      const defaultValueElement = screen.getByText(currency);
      const color = window.getComputedStyle(
        defaultValueElement.nextElementSibling?.firstElementChild as Element
      ).color;
      return color;
    };

    const { rerender } = render(
      <RatesTable rates={rates as RatesForCurrency} />
    );
    const defaultColor = getValueColor(currencyForTest as CurrencyCodes);

    rerender(
      <RatesTable rates={{ ...rates, [currencyForTest]: defaultValue + 1 }} />
    );
    const biggerColor = getValueColor(currencyForTest as CurrencyCodes);

    rerender(
      <RatesTable rates={{ ...rates, [currencyForTest]: defaultValue - 1 }} />
    );
    const smallerColor = getValueColor(currencyForTest as CurrencyCodes);

    expect(defaultColor).not.toEqual(biggerColor);
    expect(defaultColor).not.toEqual(smallerColor);
    expect(biggerColor).not.toEqual(smallerColor);
  });
});
