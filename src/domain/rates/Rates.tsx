import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";
import { Currencies, RatesForCurrency } from "../../types";
import { rates as getRates } from "./api/api";
import RatesTable from "./ui/RatesTable";

const currencies = Object.keys(Currencies);

interface Props {
  updatesInterval: number;
}

function Rates({ updatesInterval }: Props) {
  const [rates, setRates] = useState<RatesForCurrency | null>(null);
  const [currency, setCurrency] = useState(currencies[0]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchRates = useCallback(async (currency) => {
    try {
      const result = await getRates(currency);
      setRates(result.rates);
    } catch (exception) {
      setErrorMessage("We failed to get rates");
    }
  }, []);

  useEffect(() => {
    fetchRates(currency);
    const intervalId = setInterval(() => {
      fetchRates(currency);
    }, 1000 * updatesInterval);
    return () => {clearInterval(intervalId)};
  }, [currency, fetchRates, updatesInterval]);

  const onChange = async (event: any) => {
    setCurrency(event.target.value);
    setRates(null);
  };

  return (
    <Container>
      <Header>Current Exchange Rates</Header>
      <Select
        data-testid="currency-select"
        value={currency}
        onChange={onChange}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </Select>
      <ErrorMessage message={errorMessage} />
      {rates && (
        <RatesTable
          data-testid="rates-table"
          rates={rates}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  margin: 2rem 0;
`;

const Header = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  overflow: hidden;

  &:before,
  :after {
    content: "";
    background-color: gainsboro;
    height: 1px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }

  &:before {
    right: 1rem;
    margin-left: -50%;
  }

  &:after {
    left: 1em;
    margin-right: -50%;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border-color: gainsboro;
  margin: 2rem 0;
`;

export default Rates;
