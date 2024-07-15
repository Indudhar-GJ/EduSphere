import React from "react";
import logo from "../images/logo.jpg";
import styled from "styled-components";
import { IoMdWifi } from "react-icons/io";

const Event = () => {
  return (
    <Main>
      <div className="one">
        <img src={logo} alt="" />
      </div>
      <div className="sec">
        <span style={{ fontSize: "26px" }}>Title</span> <br />
        <span>Lorem Lorem ipsum dolor sit amet conse ctetur adipisicing.</span>
      </div>
      <div className="third">
        <IoMdWifi />
        <br />
        <span>LIVE</span>
      </div>
    </Main>
  );
};

export default Event;

const Main = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  border: 2px solid black;
  border-radius: 5px;
  padding: 0 20px;
  width: 85%;
  margin: 10px 15px;

  .one > img {
    height: 50px;
    border-radius: 8px;
  }
  .sec {
    padding: 5px 0;
  }
  .third {
    color: red;
    font-size: 33px;
    line-height: 6px;
    span {
      font-size: 15px;
    }
  }
`;
