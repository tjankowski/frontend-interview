import { request } from "../../../infrastructure/api";
import { CurrencyCodes } from "../../../types";

export async function convert(
  fromCurrency: CurrencyCodes,
  toCurrency: CurrencyCodes,
  amount: number
) {
  return await request(
    `/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
  );
}
