import { isCurrency, isPositiveNumber } from "./utils";

describe("isPositiveNumber", () => {
  it.each([
    ["", false],
    ["two", false],
    ["1", true],
    ["12.12", true],
    ["0", false],
    ["-1", false],
  ])("%d value isPositiveNumber %s)", (value, expected) => {
    expect(isPositiveNumber(value)).toEqual(expected);
  });
});

describe("isCurrency", () => {
  it.each([
    ["A", ["A", "B"], true],
    ["C", ["A", "B"], false],
  ])("%d value isCurrency)", (currency, currencies, expected) => {
    expect(isCurrency(currency, currencies)).toEqual(expected);
  });
});
