import React from "react";
import logo from "../images/footer-logo.png";
import styled from "styled-components";

const Footer = () => {
  return (
    <Main>
      <div>
        <div>
          <div style={{ borderRight: "2px solid #9c9c9c" }}>
            <img src={logo} alt="" />
          </div>
          <div>
            <p style={{ fontSize: "20px", marginLeft: "-160px" }}>
              Virtual class <br /> for zoom
            </p>
          </div>
        </div>
        <div>
          <p style={{ fontSize: "18px", color: "#9c9c9c", fontWeight: "700" }}>
            Subscribe to get our Newsletter
          </p>
        </div>
        <div className="iab">
          <input type="text" name="" id="" placeholder="Your Email" />
          <button type="submit">Subscribe</button>
        </div>
        <div style={{ flexDirection: "column" }}>
          <div style={{ color: "#9c9c9c", margin: "10px 0" }}>
            <span style={{ padding: "0 15px" }}>Careers </span> <span>|</span>
            <span style={{ padding: "0 15px" }}>Privacy Policy</span>
            <span>|</span>
            <span style={{ padding: "0 15px" }}>Terms & Conditions</span>
          </div>
          <div>
            <span style={{ color: "#9c9c9c" }}>
              &copy; 2024 Class Technologies Inc.
            </span>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Footer;

const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  > div > div {
    width: 600px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 30px 0;
    > div {
      padding: 0 50px;
    }
  }
  .iab {
    > input {
      height: 45px;
      border: 2px solid #4a4a4a;
      :focus {
        border: 2px solid #ffffff;
      }
      color: white;
      background-color: transparent;
      border-radius: 25px;
      padding: 0 25px;
      width: 275px;
    }
    padding: 0;
    margin-top: -10px;
    > button {
      background-color: #49bbbd;
      color: white;
      margin-left: -180px;
      border-radius: 30px;
      padding: 12px 20px;
      font-weight: 700;
    }
  }
`;
