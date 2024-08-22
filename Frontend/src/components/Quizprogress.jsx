import React from "react";
import styled, { keyframes } from "styled-components";

const elSet = 5;

const bouncing = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
`;

const fade = keyframes`
  50% {
    opacity: 0.3;
  }
`;

const orange = "#FE9000";
const orangeLight = "#FFB732";
const yellow = "#FFDD4A";
const blueLight = "#5ADBFF";
const blue = "#3C6997";
const bounce = "cubic-bezier(0, 0, 0, 1.97)";
const smooth = "cubic-bezier(0, 0.72, 0.58, 1)";

const Bar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: auto auto 0;
  width: 300px;
  max-width: calc(100% - 30px);
`;

const BarInput = styled.input`
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: -9999px;
  left: -9999px;

  &:checked ~ .bar-view:after {
    transform: scaleX(1);
  }

  &:checked ~ .bar-view .bar-button:before {
    transform: none;
    opacity: 1;
  }

  &:checked + .bar-view .bar-button:after {
    opacity: 1;
    animation: ${bouncing} 0.6s cubic-bezier(0, 0, 0.74, 1.04) infinite;
  }
`;

const BarView = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;

  &:after {
    height: 2px;
    top: calc(50% - 1px);
    transition: transform 0.06s ${smooth};
    transform: scaleX(0);
    background: ${orangeLight};
    transform-origin: left;
    z-index: 1;
  }

  &:not(:last-child):before,
  &:not(:last-child):after {
    content: "";
    width: calc(100% - 24px);
    position: absolute;
    right: calc(50% + 12px);
  }

  &:not(:last-child):before {
    height: 6px;
    top: calc(50% - 3px);
    background: ${blue};
  }
`;

const BarButton = styled.label`
  display: block;
  width: 30px;
  height: 30px;
  margin: auto;
  border-radius: 50%;
  border: 3px solid ${blue};
  position: relative;
  cursor: pointer;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.3),
    2px 2px 8px rgba(0, 0, 0, 0.1);

  &:hover:after {
    transform: none;
    opacity: 1;
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    pointer-events: none;
  }

  &:before {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at center, ${yellow}, ${orange});
    transform: scale(0.3);
    opacity: 0;
    transition: transform 0.2s ${smooth}, opacity 0.2s ${smooth};
  }

  &:after {
    border: 8px solid transparent;
    border-top-color: ${blueLight};
    bottom: calc(100% + 10px);
    left: calc(50% - 8px);
    transform: translateY(-10px);
    opacity: 0;
    transition: transform 0.2s ${bounce}, opacity 0.2s ${bounce};
  }
`;

const Command = styled.div`
  font-family: "Ubuntu Mono", monospace;
  letter-spacing: 1px;
  margin: 30px auto auto;
  animation: ${fade} 1s ease infinite;
`;

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* background: linear-gradient(to bottom right, ${yellow}99, #fff); */
`;

const RadioButtonComponent = () => {
  return (
    <Bar>
      {Array.from({ length: elSet }, (_, n) => (
        <React.Fragment key={n}>
          <BarInput type="radio" name="input" id={`input_${n}`} />
          <BarView className="bar-view">
            <BarButton
              className="bar-button"
              htmlFor={`input_${n}`}
            ></BarButton>
          </BarView>
        </React.Fragment>
      ))}
    </Bar>
  );
};

const Quizprogress = () => {
  return (
    <AppWrapper>
      <Command></Command>
      <RadioButtonComponent />
      <Command></Command>
    </AppWrapper>
  );
};

export default Quizprogress;
