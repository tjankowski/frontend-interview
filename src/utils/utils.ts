export function isCurrency(value: string, currencies: string[]): boolean {
  return currencies.includes(value);
}

export function isPositiveNumber(value: string): boolean {
  const number = parseFloat(value);
  return !isNaN(number) && number > 0;
}
