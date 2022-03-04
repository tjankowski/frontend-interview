import React from "react";
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Converter from "./Converter";
import { CurrencyCodes } from "../../types";

const Labels = {
  FROM: "From Currency",
  TO: "To Currency",
  AMOUNT: "Amount",
};

const mockConvert = jest.fn();

jest.mock("./api/api", () => ({
  ...jest.requireActual("./api/api"),
  convert: (from: CurrencyCodes, to: CurrencyCodes, amount: number) =>
    mockConvert(from, to, amount),
}));

describe("Converter", () => {
  beforeEach(() => {
    mockConvert.mockClear();
  });
  it("renders default form", () => {
    render(<Converter />);
    const labels = [Labels.FROM, Labels.TO, Labels.AMOUNT];
    labels.forEach((label) =>
      expect(screen.getByLabelText(label)).toBeVisible()
    );
    const button = screen.getByText("Convert");
    expect(button).toBeVisible();
    expect(button).toBeDisabled();
  });

  it("renders active button for valid input", () => {
    render(<Converter />);

    const fromElement = screen.getByLabelText(Labels.FROM);
    const toElement = screen.getByLabelText(Labels.TO);
    const amountElement = screen.getByLabelText(Labels.AMOUNT);
    fireEvent.change(fromElement, { target: { value: "EUR" } });
    fireEvent.change(toElement, { target: { value: "USD" } });
    fireEvent.change(amountElement, { target: { value: "100" } });

    const button = screen.getByText("Convert");
    expect(button).toBeVisible();
    expect(button).not.toBeDisabled();
  });

  it.each([Labels.FROM, Labels.TO])(
    "renders message about not supported currency",
    async (label) => {
      render(<Converter />);

      const fromElement = screen.getByLabelText(label);

      fireEvent.change(fromElement, { target: { value: "ASD" } });

      await screen.findByText("Currency is not supported");
    }
  );

  it("should convert amount", async () => {
    const from = "EUR";
    const to = "USD";
    const amount = "100";
    mockConvert.mockImplementationOnce(() => ({ convertedAmount: 200 }));
    render(<Converter />);

    const fromElement = screen.getByLabelText(Labels.FROM);
    const toElement = screen.getByLabelText(Labels.TO);
    const amountElement = screen.getByLabelText(Labels.AMOUNT);

    fireEvent.change(fromElement, { target: { value: from } });
    fireEvent.change(toElement, { target: { value: to } });
    fireEvent.change(amountElement, { target: { value: amount } });

    const button = screen.getByText("Convert");
    fireEvent.click(button);

    expect(mockConvert).toBeCalledTimes(1);
    expect(mockConvert).toBeCalledWith(from, to, Number(amount));

    const convertedAmountElement = await screen.findByDisplayValue(200);
    expect(convertedAmountElement).toBeVisible();
    expect(convertedAmountElement).toHaveAttribute("readonly");
  });

  it("should handle convert error", async () => {
    const from = "EUR";
    const to = "USD";
    const amount = "100";
    mockConvert.mockImplementationOnce(() => {
      throw new Error("Cant' convert");
    });
    render(<Converter />);

    const fromElement = screen.getByLabelText(Labels.FROM);
    const toElement = screen.getByLabelText(Labels.TO);
    const amountElement = screen.getByLabelText(Labels.AMOUNT);

    fireEvent.change(fromElement, { target: { value: from } });
    fireEvent.change(toElement, { target: { value: to } });
    fireEvent.change(amountElement, { target: { value: amount } });

    const button = screen.getByText("Convert");
    fireEvent.click(button);

    expect(mockConvert).toBeCalledTimes(1);
    expect(mockConvert).toBeCalledWith(from, to, Number(amount));

    const convertedAmountElement = await screen.findByDisplayValue(
      "We failed to convert currencies"
    );
    expect(convertedAmountElement).toBeVisible();
    expect(convertedAmountElement).toHaveAttribute("readonly");
  });
});
