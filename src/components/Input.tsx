import React from "react";
import styled from "styled-components";
import { palette } from "../styles";

type InputProps = {
  name: string;
  label?: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  value?: string;
  isValid?: boolean;
  errorMessage?: string;
  helpMessage?: string;
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  onChange,
  value,
  readOnly = false,
  isValid = true,
  errorMessage,
  helpMessage,
}) => {
  return (
    <Container>
      {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
      <StyledInput
        id={name}
        name={name}
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
        value={value}
        isValid={isValid}
      />
      {errorMessage && !isValid && (
        <Message valid={isValid}>{errorMessage}</Message>
      )}
      {helpMessage && isValid && (
        <Message valid={isValid}>{helpMessage}</Message>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-weight: 600;
  margin: 12px 0 8px;
`;

const StyledInput = styled.input<{ isValid: boolean }>`
  padding: 0.5rem 1rem;
  border: solid 1px ${({ isValid }) => (isValid ? "rgba(0, 0, 0, 0.2)" : "red")};
  border-radius: 4px;
  outline-color: ${palette.blue};
`;

const Message = styled.div<{ valid: boolean }>`
  color: ${({ valid }) => (valid ? "gray" : "red")};
  padding: 0.5rem 0;
  font-size: 0.75rem;
`;

export default Input;
