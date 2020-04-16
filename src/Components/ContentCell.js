import React from "react";
import styled from "styled-components";
import Typed from "react-typed";

const Wrapper = styled.div`
  min-width: 400px;
  max-width: 100vw;
  height: 100%;
  min-height: 480px;
  display: flex;
  align-items: center;
  padding: 0px 40px;
`;

const DefaultCell = styled.div`
  span {
    font-size: 17px;
    line-height: 160%;
    word-break: keep-all;
  }
`;

const CoverCell = styled.div`
  width: 100%;
  height: 100%;
  span {
    font-size: 32px;
    font-weight: bold;
  }
`;

const IndexCell = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    ${(props) => props.theme.fontRoboto}
    &:first-child {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 40px;
    }
    &:not(:first-child) {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
`;

const ChapCover = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    &:first-child {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    &:not(:first-child) {
      font-size: 20px;
    }
  }
`;

const ContentCell = ({ text, type }) => {
  // default: 기본 셀, cover: 표지, index: 목차, chapCover: 챕터표지
  if (type === "content") {
    return (
      <Wrapper type={type}>
        <DefaultCell>
          <span>{text}</span>
        </DefaultCell>
      </Wrapper>
    );
  } else if (type === "cover") {
    return (
      <Wrapper type={type}>
        <CoverCell>
          <Typed strings={[text]} typeSpeed={80} startDelay={1000} />
        </CoverCell>
      </Wrapper>
    );
  } else if (type === "index") {
    return (
      <Wrapper type={type}>
        <IndexCell>
          <span>{`__들어가기__`}</span>
          {text.map((item, i) => {
            return <span key={i}>{item}</span>;
          })}
        </IndexCell>
      </Wrapper>
    );
  } else if (type === "chapCover") {
    return (
      <Wrapper type={type}>
        <ChapCover>
          <span>Chap {text[0]}</span>
          <span>{text[1]}</span>
        </ChapCover>
      </Wrapper>
    );
  }
};

export default ContentCell;
