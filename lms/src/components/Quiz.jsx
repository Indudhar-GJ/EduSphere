import React, { useState } from "react";
import styled from "styled-components";

const Quiz = () => {
  const [selectedOption1, setSelectedOption1] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState(false);
  const [selectedOption4, setSelectedOption4] = useState(false);
  return (
    <Main>
      <h1>Question</h1>
      <Container1>
        <Question>
          <h3>This is a template where the question will be asked?</h3>
        </Question>
        <Options>
          <Choice
            onClick={() => {
              setSelectedOption1(true);
              setSelectedOption2(false);
              setSelectedOption3(false);
              setSelectedOption4(false);
            }}
            className={selectedOption1 ? "selected" : ""}
          >
            Option A
          </Choice>
          <Choice
            onClick={() => {
              setSelectedOption1(false);
              setSelectedOption2(true);
              setSelectedOption3(false);
              setSelectedOption4(false);
            }}
            className={selectedOption2 ? "selected" : ""}
          >
            Option B
          </Choice>
          <Choice
            onClick={() => {
              setSelectedOption1(false);
              setSelectedOption2(false);
              setSelectedOption3(true);
              setSelectedOption4(false);
            }}
            className={selectedOption3 ? "selected" : ""}
          >
            Option C
          </Choice>
          <Choice
            onClick={() => {
              setSelectedOption1(false);
              setSelectedOption2(false);
              setSelectedOption3(false);
              setSelectedOption4(true);
            }}
            className={selectedOption4 ? "selected" : ""}
          >
            Option D
          </Choice>
        </Options>
        <button type="submit">Submit</button>
      </Container1>
    </Main>
  );
};

export default Quiz;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: end;
    margin: 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    background-color: #00ae51;
  }
  h1 {
    border: 1px solid black;
    border-radius: 35px;
    padding: 10px 15px;
    position: relative;
    top: 49px;
    background-color: #fff;
  }
`;
const Container1 = styled.div`
  width: 600px;
  border: 1px solid black;
  padding: 50px 30px;
  border-radius: 5px;
`;
const Question = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
`;
const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  .selected {
    background-color: wheat;
    color: black;
  }
  :hover {
    transform: scale(1.05);
    transition: 0.2s ease-in;
  }
`;
const Choice = styled.div`
  transition: 0.4s ease-out;
  border: 1px solid gray;
  border-radius: 7px;
  padding: 12px 15px;
  cursor: pointer;
`;
