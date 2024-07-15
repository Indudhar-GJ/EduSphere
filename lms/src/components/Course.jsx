import React, { useState } from "react";
import styled from "styled-components";
import { LuGraduationCap } from "react-icons/lu";
import logo1 from "../images/profile-icon.svg";
import logo2 from "../images/Illustrator-card.svg";
import { Link } from "react-router-dom";

const Course = ({ id, subject, content, teacher, chapters }) => {
  return (
    <Link
      to={{
        pathname: `/course/${id}`,
        // state: { courseName: { id } },
      }}
    >
      <Main>
        <div className="info">
          <div className="inside">
            <LuGraduationCap className="hat-icon" />
            <div>{chapters} Chapters</div>
          </div>
          <div className="textcontent">
            <span style={{ fontSize: "25px", color: "#b4b4b4" }}>
              {subject}
            </span>{" "}
            <br />
            <span style={{ fontSize: "18px" }}>{content}</span>
          </div>
          <div className="bottom">
            <div>
              <img src={logo1} alt="" />{" "}
              <span style={{ color: "#b4b4b4" }}>{teacher}</span>
            </div>
            <img className="img2" src={logo2} alt="" />
          </div>
        </div>
      </Main>
    </Link>
  );
};

export default Course;

const Main = styled.div`
  :hover {
    cursor: pointer;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    background-color: rgba(0, 28, 39, 1);
    border-radius: 12px;
    color: white;
    padding: 25px;
    /* height: ${(props) => props.h};
    width: ${(props) => props.w}; */
    height: 220px;
    width: 340px;

    .textcontent {
      padding: 15px 0;
      line-height: 25px;
      text-align: start;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      color: white;
      > div > img {
        height: 25px;
      }
    }
  }
  .img2 {
    margin-top: -25px;
  }
  .inside {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .hat-icon {
    padding: 5px;
    font-size: 40px;
    border-radius: 50%;
    background-color: #56ccf2;
  }
`;
