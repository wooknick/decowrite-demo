import React, { useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import routesName from "../routesName";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.darkBlue};
`;

const MyLoader = styled(Loader)`
  margin-bottom: 60px;
`;

const ErrorText = styled.div`
  margin-bottom: 20px;
`;

const RedirectText = styled.div``;

const Forbidden = withRouter(
  ({ history, error = "요청한 페이지를 찾을 수 없습니다." }) => {
    useEffect(() => {
      const t = setTimeout(() => {
        history.push(routesName.home);
      }, 3000);
      return () => clearTimeout(t);
    }, [history]);

    return (
      <Wrapper>
        <MyLoader
          type="Bars"
          color={"#555A6B"}
          height={50}
          width={50}
          timeout={3000} //3 secs
        />
        <ErrorText>{error}</ErrorText>
        <RedirectText>{"잠시 후 홈으로 돌아갑니다."}</RedirectText>
      </Wrapper>
    );
  }
);

export default Forbidden;
