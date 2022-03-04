import React from "react";
import styled from "styled-components";
import { palette } from "../styles";

type Props = {
  disabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<Props> = ({ disabled, children, onClick }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background-color: ${(props) => (props.disabled ? "LightGray" : palette.blue)};
  padding: 12px 8px;
  width: 100%;
  border-radius: 4px;
  border: 0;
  color: white;
  font-weight: 500;
`;

export default Button;
