import React from "react";
import { render, screen } from "@testing-library/react";
import RatesTable from "./RatesTable";
import { RatesForCurrency } from "../../../types";
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
});
