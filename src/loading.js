import React from "react";
import styled, { keyframes } from "styled-components";

const Spinning = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Loader = styled.div`
  /* border: 46px solid #f3f3f3; 
  border-top: 46px solid #1565c0;  */
  border: 20px solid #f3f3f3;
  border-top: 20px solid #1565c0;
  border-radius: 50%;
  /* width: 280px;
  height: 280px; */
  width: 75px;
  height: 75px;
  margin-top: -15px;
  @media (min-width: 768px) {
    /* margin-top: 30px;
    width: 320px;
    height: 320px;
    margin-bottom: 30px; */
    /* Light grey */
    /* border: 20px solid #f3f3f3; */
    /* Blue */
    /* border-top: 20px solid #1565c0;
    width: 75px;
    height: 75px; */
    margin-top: -10px;
  }
  animation: ${Spinning} 2s linear infinite;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  animation-duration: 0.25s;
  animation-name: ${LoadingFadeIn};
  animation-fill-mode: both;
`;

const Loading = () => {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
};

export default Loading;
