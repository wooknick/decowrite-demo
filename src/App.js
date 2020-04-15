import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./Styles/GlobalStyles";
import Theme from "./Styles/Theme";
import Router from "./Components/Router";

const Wrapper = styled.div`
  width: 100vw;
  max-width: 550px;
  height: ${(props) => props.innerHeight}px;
  min-height: 550px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`;

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Wrapper>
        <Router />
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
