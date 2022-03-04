import React from "react";
import styled from "styled-components";
import { CurrencyCodes, RatesForCurrency } from "../../../types";
import { usePrevious } from "../hooks/usePrevious";

interface Props {
  rates: RatesForCurrency;
  ["data-testid"]?: string;
}

const RatesTable: React.FC<Props> = (props) => {
  const { rates } = props;
  const history = usePrevious(rates);

  return (
    <Table data-testid={props["data-testid"]}>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Exchange rate</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(rates).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>
              <Value
                change={
                  history != null 
                    ? value - history[key as CurrencyCodes]
                    : 0
                }
              >
                {value.toFixed(2)}
              </Value>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  & thead > tr {
      background: #F1F1F1;
      border-collapse: separate;
      border-radius: .25rem;
  }

  & tr {
    border-top: 1px solid gainsboro;
    &:first-child {
        border-top: none;
      }
  }

  & td, th {
    text-align: right;
    padding: 0.5rem 1rem;
    &:first-child {
        text-align: left;
      }
    }
  }

`;

const Value = styled.span<{ change: number }>`
  transition: color 0.5s ease;
  color: ${({ change }) =>
    change > 0 ? "green" : change < 0 ? "red" : "black"};
`;
export default RatesTable;
