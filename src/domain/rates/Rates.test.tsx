import React from "react";
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
  findByTestId,
} from "@testing-library/react";
import Rates from "./Rates";
import { CurrencyCodes } from "../../types";
import { generateMockRates } from "../../utils/testUtils";

const rates = generateMockRates();
const mockRates = jest.fn();

jest.mock("./api/api", () => ({
  ...jest.requireActual("./api/api"),
  rates: (currency: CurrencyCodes) => mockRates(currency),
}));

describe("Converter", () => {
  beforeEach(() => {
    mockRates.mockClear();
  });
  it("should fetch rates on mounting", async () => {
    mockRates.mockImplementationOnce(() => ({ rates }));
    await waitFor(() => {
      render(<Rates />);
    });

    expect(mockRates).toBeCalledTimes(1);
    expect(mockRates).toBeCalledWith(Object.keys(rates)[0]);
    expect(screen.getByTestId("rates-table")).toBeVisible();
  });

  it("should handle error from fetch", async () => {
    mockRates.mockImplementationOnce(() => {
      throw new Error("test error");
    });
    await waitFor(() => {
      render(<Rates />);
    });

    expect(mockRates).toBeCalledTimes(1);
    expect(mockRates).toBeCalledWith(Object.keys(rates)[0]);
    expect(screen.getByText("We failed to get rates")).toBeVisible();
  });

  it("should refetch data on change", async () => {
    mockRates.mockImplementation(() => ({ rates }));
    await waitFor(() => {
      render(<Rates />);
    });

    fireEvent.change(screen.getByTestId("currency-select"), {
      target: { value: Object.keys(rates)[1] },
    });

    await waitFor(() => {
      expect(screen.getByTestId("rates-table")).toBeVisible();
    });

    expect(mockRates).toBeCalledTimes(2);
    expect(mockRates).toBeCalledWith(Object.keys(rates)[0]);
    expect(mockRates).toBeCalledWith(Object.keys(rates)[1]);
  });
});
