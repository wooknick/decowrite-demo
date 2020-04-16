import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./Styles/GlobalStyles";
import Theme from "./Styles/Theme";
import Router from "./Components/Router";
import OrientationImg from "./Images/mobile-phone.svg";

const Landscape = styled.div`
  @media screen and (max-height: 475px) {
    visibility: visible;
  }
  visibility: hidden;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & img {
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
  }
  div {
    font-size: 25px;
    font-weight: bold;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Landscape>
        {/* <div>"hi"</div> */}
        <img alt="orientationImg" src={OrientationImg} />
        <div>세로로 돌려주세요.</div>
      </Landscape>
      <Router />
    </ThemeProvider>
  );
};

export default App;
