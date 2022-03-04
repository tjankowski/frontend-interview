import { request } from "../../../infrastructure/api";
import { CurrencyCodes } from "../../../types";

export async function rates(currency: CurrencyCodes) {
  return await request(`/rates/${currency}`);
}
