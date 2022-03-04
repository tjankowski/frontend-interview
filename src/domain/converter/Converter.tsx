import React, { useState } from "react";
import styled from "styled-components";
import { convert } from "./api/api";
import { Currencies, CurrencyCodes } from "../../types";
import { isCurrency, isPositiveNumber } from "../../utils/utils";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useHistory } from "./hooks/useHistory";
import History from "./ui/History";

const currencies = Object.keys(Currencies);

function Converter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const { history, addToHistory } = useHistory();

  const convertAmount = async () => {
    try {
      const result = await convert(
        fromCurrency as CurrencyCodes,
        toCurrency as CurrencyCodes,
        Number(amount)
      );
      addToHistory(
        Number(amount),
        fromCurrency as CurrencyCodes,
        toCurrency as CurrencyCodes,
        Number(result.convertedAmount)
      );
      setConvertedAmount(result.convertedAmount);
    } catch (expcetion) {
      setConvertedAmount("We failed to convert currencies");
    }
  };

  const isValid =
    isCurrency(fromCurrency, currencies) &&
    isCurrency(toCurrency, currencies) &&
    isPositiveNumber(amount);

  return (
    <div>
      <Input
        name="amount"
        label="Amount"
        onChange={(value) => setAmount(value)}
        value={amount}
        helpMessage="Please put amount of money that you would like convert"
      />
      <CurrenciesContainer>
        <Input
          name="from-currency"
          label="From Currency"
          onChange={(value) => setFromCurrency(value.toUpperCase())}
          value={fromCurrency}
          isValid={
            fromCurrency.length < 3 || isCurrency(fromCurrency, currencies)
          }
          errorMessage="Currency is not supported"
        />
        <Input
          name="to-currency"
          label="To Currency"
          onChange={(value) => setToCurrency(value.toUpperCase())}
          value={toCurrency}
          isValid={toCurrency.length < 3 || isCurrency(toCurrency, currencies)}
          errorMessage="Currency is not supported"
        />
      </CurrenciesContainer>
      <Button disabled={!isValid} onClick={convertAmount}>
        Convert
      </Button>
      {convertedAmount && (
        <Input
          name="converted-amount"
          label="Converted amount"
          value={convertedAmount}
          readOnly={true}
        />
      )}
      <History history={history} />
    </div>
  );
}

const CurrenciesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 1rem;
`;

export default Converter;
