import React from "react";
import styled from "styled-components";

type InputProps = {
  name: string;
  label?: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  value?: string;
  errorMessage?: string;
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  onChange,
  value,
  readOnly = false,
  errorMessage,
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
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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

const StyledInput = styled.input`
  padding: 0.5rem 1rem;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  color: red;
  padding: 0.5rem 0;
  font-size: 0.75rem;
`;

export default Input;
