import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import LogoImg from "../Images/logo.png";
import routesName from "../routesName";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 667px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 25vh;
  padding-bottom: 50px;
  color: ${(props) => props.theme.darkBlue};
`;

const Logo = styled.div`
  width: 70%;
  height: 120px;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  width: auto;
  max-height: 100%;
`;

const fadeInFrames = keyframes`
    0%{
        opacity: 0;
        transform: translateY(10px);
        
    }
    100%{
        opacity: 1;
        transform: translateY(0px);
    }
`;

const fadeIn = (props) =>
  css`
    animation: ${fadeInFrames} 0.3s linear;
  `;

const MyLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.darkBlue};
  border: none;
`;

const Gate = styled.div`
  width: 120px;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${fadeIn}
  &:hover {
    cursor: pointer;
  }
`;

const Home = () => {
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setGateOpen(true);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Wrapper>
      <Logo>
        <Img src={LogoImg}></Img>
      </Logo>
      {gateOpen && (
        <MyLink to={`${routesName.read}/LuckyDay`}>
          <Gate>ENTER</Gate>
        </MyLink>
      )}
    </Wrapper>
  );
};

export default Home;
