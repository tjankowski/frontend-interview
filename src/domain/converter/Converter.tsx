import React, { useState } from "react";
import styled from "styled-components";
import { convert } from "./api/api";
import { Currencies, CurrencyCodes } from "../../types";
import { isCurrency, isPositiveNumber } from "../../utils/utils";
import Input from "../../components/Input";
import Button from "../../components/Button";

const currencies = Object.keys(Currencies);

function Converter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  const convertAmount = async () => {
    try {
      const result = await convert(
        fromCurrency as CurrencyCodes,
        toCurrency as CurrencyCodes,
        Number(amount)
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
      />
      <CurrenciesContainer>
        <Input
          name="from-currency"
          label="From Currency"
          onChange={(value) => setFromCurrency(value.toUpperCase())}
          value={fromCurrency}
          errorMessage={
            fromCurrency.length >= 3 && !isCurrency(fromCurrency, currencies)
              ? "Currency is not supported"
              : undefined
          }
        />
        <Input
          name="to-currency"
          label="To Currency"
          onChange={(value) => setToCurrency(value.toUpperCase())}
          value={toCurrency}
          errorMessage={
            toCurrency.length >= 3 && !isCurrency(toCurrency, currencies)
              ? "Currency is not supported"
              : undefined
          }
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
