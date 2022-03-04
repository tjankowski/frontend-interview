import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { palette } from "../styles";
import Converter from "../domain/converter/Converter";
import Rates from "../domain/rates/Rates";

function App() {
  return (
    <div>
      <StyledHeader>
        <Logo title="Cleo" />
        <p>Currency Converter</p>
      </StyledHeader>
      <ContentContainer>
        <ConverterContainer>
          <Converter />
          <Rates updatesInterval={30} />
        </ConverterContainer>
      </ContentContainer>
    </div>
  );
}

const StyledHeader = styled.header`
  height: 280px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: ${palette.blue};
  color: ${palette.white};
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConverterContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  width: 400px;
  margin-top: -50px;
  background-color: ${palette.white};
  padding: 36px 30px;
`;
export default App;
