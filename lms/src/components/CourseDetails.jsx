import React, { useEffect } from "react";
import SideNavbar from "./SideNavbar";
import styled from "styled-components";
import logo from "../images/coursedetail1.png";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

const CourseDetails = () => {
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      console.log("not auth");
    }
  }, []);
  return (
    <Main>
      <SideNavbar />
      <FirstContainer>
        <Container1>
          <img src={logo} alt="" />
        </Container1>
        <Container2>
          <Left>
            <div className="btns">
              <button type="submit">Overview</button>
              <button type="submit">Rating</button>
              <button type="submit">Tutor</button>
              <button type="submit">Related courses</button>
            </div>
            <div className="info"></div>
          </Left>
          <Right>
            <div className="c11">
              <img src={logo} alt="" />
              <div className="tx">
                <div>
                  <p
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <span style={{ fontSize: "130%", fontWeight: "600" }}>
                      $49.99
                    </span>
                    <s> $99.99 </s>
                    <span>50%</span>
                  </p>
                </div>
                <p
                  style={{
                    textAlign: "center",
                    color: "#49bbbd",
                    margin: "18px 0",
                  }}
                >
                  11 hours left at this price
                </p>
                <button>Buy now</button>
                <hr />
                <h2 style={{ margin: "20px 0" }}>This Course included</h2>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    marginBottom: "15px",
                  }}
                >
                  <li>Money back guarantee</li>
                  <li>Access on all devices</li>
                  <li>Certification of completion</li>
                  <li>32 Modules</li>
                </ul>
                <hr />
                <h2 style={{ marginTop: "20px" }}>Training 5 or more people</h2>
                <p
                  style={{
                    marginBottom: "20px",
                    fontSize: "90%",
                    marginTop: "5px",
                  }}
                >
                  Class, launched less than a year ago by Blackboard co-founder
                  Michael Chasen, integrates exclusively...
                </p>
                <hr />
                <h2 style={{ marginTop: "10px" }}>Share this Course</h2>
                <div
                  style={{
                    display: "flex",
                    gap: "25px",
                    margin: "20px 5px",
                    fontSize: "118%",
                  }}
                >
                  <FaTwitter />
                  <FaFacebook />
                  <IoLogoYoutube />
                  <FaInstagram />
                  <FaTelegram />
                  <FaWhatsapp />
                </div>
              </div>
            </div>
          </Right>
        </Container2>
      </FirstContainer>
    </Main>
  );
};

export default CourseDetails;

const Left = styled.div``;
const Right = styled.div`
  .c11 {
    position: relative;
    right: -1153px;
    bottom: 185px;
    width: 330px;
    > img {
      width: inherit;
      height: 188px;
      border: 20px solid white;
      border-radius: 10px;
    }
  }
  .tx {
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    button {
      height: 35px;
      border-radius: 10px;
      background-color: #49bbbd;
      color: white;
      font-size: 120%;
      border: none;
      margin: 10px 40px;
    }
    ul {
      margin-left: 30px;
    }
  }
`;

const Container2 = styled.div``;
const Main = styled.div``;
const FirstContainer = styled.div`
  margin-left: 80px;
  width: calc(100vw - 80px);
`;
const Container1 = styled.div`
  > img {
    width: calc(100vw - 80px);
  }
`;
