import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Slider from "react-slick";
import ContentCell from "../../Components/ContentCell";
import "./Read.css";
import nf from "../../notesFrequency";

const EMOTION_NAME = {
  0: "neutral",
  1: "happy",
  2: "hate",
};

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 768px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-end;
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

const fadeOutFrames = keyframes`
0%{
    opacity: 1;
    transform: translateY(0px);
    
}
100%{
    opacity: 0;
    transform: translateY(-10px);
}
`;

const fadeOut = (props) =>
  css`
    animation: ${fadeOutFrames} 0.3s linear;
  `;

const Title = styled.div`
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  opacity: ${(props) => (props.active ? 1 : 0)};
  ${(props) => (props.active ? fadeIn : fadeOut)}
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  height: 60%;
  min-height: 480px;
  z-index: 5;
`;

const ESlider = styled(Slider)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
`;

const PageNumber = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  opacity: ${(props) => (props.active ? 1 : 0)};
  ${(props) => (props.active ? fadeIn : fadeOut)}
`;

const PageMoveTo = styled.div`
  width: 50%;
  height: 50%;
  position: absolute;
  bottom: 0;
  ${(props) => props.to === "prev" && "left:0;"}
  ${(props) => props.to === "next" && "right:0;"}
  &:hover {
    cursor: pointer;
  }
`;

const Presenter = ({ title, pages, emotions, tone }) => {
  const [page, setPage] = useState(0);
  const [beforePage, setBeforePage] = useState(0);
  const [emotion, setEmotion] = useState(0);
  const [emotionClass, setEmotionClass] = useState(EMOTION_NAME[0]);
  const [soundStatus, setSoundStatus] = useState("stop");
  const [intervalId, setIntervalId] = useState(0);
  const [timeoutIds, setTimeoutIds] = useState([]);

  const sliderRef = useRef();

  useEffect(() => {
    const t = setInterval(() => {
      if (emotionClass === "happy") {
        setEmotionClass("happy-breathe");
      } else if (emotionClass === "happy-breathe") {
        setEmotionClass("happy");
      } else if (emotionClass === "hate") {
        setEmotionClass("hate-breathe");
      } else if (emotionClass === "hate-breathe") {
        setEmotionClass("hate");
      }
    }, 2000);
    return () => clearInterval(t);
  }, [emotionClass]);

  const makeSound = (time, interval, melody) => {
    let tick = interval;
    melody.forEach((note) => {
      let t = setTimeout(() => {
        tone.trigger(nf[note], time);
      }, tick);
      tick += interval;
      setTimeoutIds((v) => [...v, t]);
    });
    tick = interval;
    let t = setInterval(() => {
      melody.forEach((note) => {
        let t = setTimeout(() => {
          tone.trigger(nf[note], time);
        }, tick);
        tick += interval;
        setTimeoutIds((v) => [...v, t]);
      });
    });
    setIntervalId(t);
  };

  const playSound = () => {
    if (soundStatus === "stop") {
      setSoundStatus("play");
      makeSound("0.34", 700, ["E4", "A4", "C5", "A4", "D#4", "A4", "B4", "A4"]);
    }
  };

  const stopSound = () => {
    if (soundStatus === "play") {
      clearInterval(intervalId);
      timeoutIds.forEach((id) => {
        clearTimeout(id);
      });
      setSoundStatus("stop");
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: true,
    initialSlide: 0,
    swipeToSlide: true,
    touchThreshold: 5,
    afterChange: (index) => {
      setBeforePage(page);
      setPage(index);
      if (emotion !== emotions[index]) {
        setEmotion(emotions[index]);
        setEmotionClass(EMOTION_NAME[emotions[index]]);
      }
      if (emotions[index] !== 0) {
        playSound();
      } else {
        stopSound();
      }
    },
  };

  return (
    <Wrapper emotion={emotion} className={emotionClass}>
      <Header>
        <Title active={page > 0}>
          {(page !== 0 || beforePage !== 0) && <span>{title}</span>}
        </Title>
      </Header>
      <Content>
        <ESlider ref={sliderRef} {...settings}>
          {pages.map((page, i) => {
            return <ContentCell key={i} text={page.text} type={page.type} />;
          })}
        </ESlider>
      </Content>
      <Footer>
        <PageNumber active={page > 0}>
          {(page !== 0 || beforePage !== 0) && (
            <span>
              {page} / {pages.length - 1}
            </span>
          )}
        </PageNumber>
      </Footer>
      <PageMoveTo
        to="prev"
        onClick={() => {
          sliderRef.current.slickPrev();
        }}
      />
      <PageMoveTo
        to="next"
        onClick={() => {
          sliderRef.current.slickNext();
        }}
      />
    </Wrapper>
  );
};

export default Presenter;
