import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Quizprogress from "./Quizprogress";
import axios from "axios";

const Quiz = ({ data, setData }) => {
  const [selectedOption1, setSelectedOption1] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState(false);
  const [selectedOption4, setSelectedOption4] = useState(false);
  const [quizDataIndex, setQuizDataIndex] = useState(0);
  const [marks, setMarks] = useState(null);
  const [givenAns, setGivenAns] = useState([]);
  const [showMarks, setShowMarks] = useState(false);

  const setAllToNull = () => {
    setSelectedOption1(false);
    setSelectedOption2(false);
    setSelectedOption3(false);
    setSelectedOption4(false);
  };

  const loadSelectedAnswer = () => {
    const currentQuestion = data?.data?.[quizDataIndex];
    if (!currentQuestion) return;

    const answer = givenAns.find((item) => item.id === currentQuestion.id);

    if (answer) {
      setAllToNull();
      if (answer.option === 1) setSelectedOption1(true);
      else if (answer.option === 2) setSelectedOption2(true);
      else if (answer.option === 3) setSelectedOption3(true);
      else if (answer.option === 4) setSelectedOption4(true);
    } else {
      setAllToNull();
    }
  };

  useEffect(() => {
    loadSelectedAnswer();
  }, [quizDataIndex]);

  const addSelectedAnswer = () => {
    const currentQuestion = data?.data?.[quizDataIndex];
    if (!currentQuestion) return;

    const existingAnswer = givenAns.find(
      (item) => item.id === currentQuestion.id
    );
    let selectedOption = null;
    if (selectedOption1) selectedOption = 1;
    else if (selectedOption2) selectedOption = 2;
    else if (selectedOption3) selectedOption = 3;
    else if (selectedOption4) selectedOption = 4;

    if (existingAnswer) {
      setGivenAns(
        givenAns.map((item) =>
          item.id === currentQuestion.id
            ? { ...item, option: selectedOption }
            : item
        )
      );
    } else {
      setGivenAns([
        ...givenAns,
        { id: currentQuestion.id, option: selectedOption },
      ]);
    }
  };

  const checkAnswer = async () => {
    try {
      const response = await axios.post("/check-quiz-answers/", givenAns);
      // setCompletedChapters(response.data.completed_chapters);
      // console.log(response);
      setMarks(response.data.score);
      setShowMarks(true);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.detail);
      } else {
        console.log("An error occurred");
      }
    }
  };

  return (
    <Main>
      {/* <h1>Question</h1> */}

      {quizDataIndex <= 4 ? (
        <Container1>
          {/* <Quizprogress /> */}
          <Question>
            <h3>{data?.data?.[quizDataIndex]?.question} </h3>
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
              {data?.data?.[quizDataIndex]?.option1}
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
              {data?.data?.[quizDataIndex]?.option2}
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
              {data?.data?.[quizDataIndex]?.option3}
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
              {data?.data?.[quizDataIndex]?.option4}
            </Choice>
          </Options>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {quizDataIndex > 0 && (
              <button
                type="submit"
                onClick={() => {
                  addSelectedAnswer();
                  setQuizDataIndex((prev) => prev - 1);
                  setAllToNull();
                }}
              >
                PREV
              </button>
            )}
            <button
              type="submit"
              onClick={() => {
                addSelectedAnswer();
                setQuizDataIndex((prev) => prev + 1);
                setAllToNull();
              }}
            >
              NEXT
            </button>
          </div>
        </Container1>
      ) : (
        <>
          <Container1>
            {!showMarks && (
              <>
                <h3>
                  You Have Answered
                  {givenAns.filter((item) => item.option !== null).length}/
                  {givenAns.length} questions.
                </h3>
                <p>Do You Want to submit??</p>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <button
                    type="submit"
                    onClick={() => {
                      setQuizDataIndex((prev) => prev - 1);
                    }}
                  >
                    NO
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      setQuizDataIndex((prev) => prev + 1);
                      checkAnswer();
                    }}
                  >
                    YES
                  </button>
                </div>
              </>
            )}
            {showMarks && (
              <p style={{ fontSize: "120%", fontWeight: "600" }}>
                Congratulations!! You have scored{" "}
                {(100 * marks) / givenAns.length} %
              </p>
            )}
          </Container1>
        </>
      )}
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  width: 380px;
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
