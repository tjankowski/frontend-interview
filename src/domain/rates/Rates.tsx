import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";
import { Currencies, CurrencyCodes, RatesForCurrency } from "../../types";
import { rates as getRates } from "./api/api";
import RatesTable from "./ui/RatesTable";

const currencies = Object.keys(Currencies);

function Rates() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [rates, setRates] = useState<RatesForCurrency | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchRate = useCallback(async (currency) => {
    try {
      const result = await getRates(currency);
      setRates(result.rates);
    } catch (exception) {
      setErrorMessage("We failed to get rates");
    }
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      if (selectRef.current == null) {
        return;
      }
      fetchRate(selectRef.current.value as CurrencyCodes);
    };
    fetchRates();
  }, [fetchRate]);

  const onChange = async (event: any) => {
    fetchRate(event.target.value);
  };

  return (
    <Container>
      <Header>Current Exchange Rates</Header>
      <Select data-testid="currency-select" ref={selectRef} onChange={onChange}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </Select>
      <ErrorMessage message={errorMessage} />
      {rates && <RatesTable data-testid="rates-table" rates={rates} />}
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
