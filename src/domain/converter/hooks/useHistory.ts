import { useState } from "react";
import { getItem, saveItem } from "../../../infrastructure/storage";
import { CurrencyCodes } from "../../../types";

const HISTORY = "history";

export interface Item {
  amount: number;
  from: CurrencyCodes;
  to: CurrencyCodes;
  result: number;
  timestamp: number;
}

export function useHistory() {
  const [history, setHistory] = useState(JSON.parse(getItem(HISTORY) || "[]"));
  const addToHistory = (
    amount: number,
    from: CurrencyCodes,
    to: CurrencyCodes,
    result: number
  ): void => {
    const item = {
      amount,
      from,
      to,
      result,
      timestamp: new Date().getTime(),
    };
    const newHistory = [...history, item];
    saveItem(HISTORY, JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  return { history, addToHistory };
}
