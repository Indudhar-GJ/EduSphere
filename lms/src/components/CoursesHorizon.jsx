import React from "react";
import styled from "styled-components";
import { ReactComponent as ReadingIcon } from "../images/reading-icon.svg";
import { SlBookOpen } from "react-icons/sl";
import { RiFilePaper2Line } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const CoursesHorizon = ({ id, title, subject }) => {
  let navigate = useNavigate();
  const goToCourse = () => {
    navigate(`/course/${id}/`);
  };

  return (
    <>
      <Main
        onClick={() => {
          goToCourse();
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="icon">
          <ReadingIcon style={{ color: "#9747FF" }} />
        </div>
        <div className="details">
          <p style={{ fontSize: "150%" }}>{title}</p>
          <p>{subject}</p>
          <p>
            Progress <progress id="completed" max="100" value="30"></progress>
          </p>
        </div>
        <div className="infobar">
          <div className="bgcicon">
            <SlBookOpen />
          </div>
          <div className="bgcicon">
            <RiFilePaper2Line />
          </div>
          <HiDotsHorizontal style={{ marginLeft: "15px", fontSize: "25px" }} />
        </div>
      </Main>
    </>
  );
};

export default CoursesHorizon;

// const Removeable = styled.div``;
const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  width: auto;
  margin: 5px 0;
  .icon {
    padding: 15px 20px;
    background-color: #e5d1ff;
    border-radius: 5px;
  }
  .details {
    margin-right: 405px;
  }
  .infobar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 21px;
    .bgcicon {
      background-color: #c5e8ff;
      color: black;
      padding: 11px 45px 4px 10px;
      border-radius: 20px;
    }
  }
`;
