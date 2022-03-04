import React from "react";
import styled from "styled-components";
import { RatesForCurrency } from "../../../types";

interface Props {
  rates: RatesForCurrency;
  ["data-testid"]?: string;
}

const RatesTable: React.FC<Props> = (props) => {
  return (
    <Table data-testid={props["data-testid"]}>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Exchange rate</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(props.rates).map(([currency, value]) => (
          <tr key={currency}>
            <td>{currency}</td>
            <td>{value.toFixed(2)}</td>
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
export default RatesTable;
