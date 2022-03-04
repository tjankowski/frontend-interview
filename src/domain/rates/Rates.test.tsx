import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Rates from "./Rates";
import { CurrencyCodes } from "../../types";
import { generateMockRates } from "../../utils/testUtils";

const rates = generateMockRates();
const mockRates = jest.fn();
const INTERVAL_SECONDS = 5;

jest.useFakeTimers();
jest.mock("./api/api", () => ({
  ...jest.requireActual("./api/api"),
  rates: (currency: CurrencyCodes) => mockRates(currency),
}));

const renderComponent = () =>
  render(<Rates updatesInterval={INTERVAL_SECONDS} />);

describe("Converter", () => {
  beforeEach(() => {
    mockRates.mockClear();
  });
  it("should fetch rates on mounting", async () => {
    mockRates.mockImplementationOnce(() => ({ rates }));
    await waitFor(() => {
      renderComponent();
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
      renderComponent();
    });

    expect(mockRates).toBeCalledTimes(1);
    expect(mockRates).toBeCalledWith(Object.keys(rates)[0]);
    expect(screen.getByText("We failed to get rates")).toBeVisible();
  });

  it("should refetch data on change", async () => {
    mockRates.mockImplementation(() => ({ rates }));
    await waitFor(() => {
      renderComponent();
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

  it("should refetch after interval", async () => {
    mockRates.mockImplementationOnce(() => ({ rates }));
    await waitFor(() => {
      renderComponent();
    });

    expect(mockRates).toBeCalledTimes(1);
    expect(mockRates).toBeCalledWith(Object.keys(rates)[0]);

    jest.advanceTimersByTime(1000 * (INTERVAL_SECONDS + 1));

    await waitFor(() => {
      expect(screen.getByTestId("rates-table")).toBeVisible();
    });

    expect(mockRates).toBeCalledTimes(2);
    expect(mockRates).toBeCalledWith(Object.keys(rates)[0]);
  });
});
