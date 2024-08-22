import React, { useEffect } from "react";
import SideNavbar from "./SideNavbar";
import styled from "styled-components";
import { IoMdCheckmark } from "react-icons/io";
import Footer from "./Footer";

const Membership = () => {
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
      <MidContainer>
        <Container1>
          <h1 style={{ color: "#49bbbd", fontSize: "300%" }}>
            Affordable Pricing
          </h1>
          <Container2>
            <div className="card">
              <div>
                <h3>Free Trail</h3>
                <p style={{ fontWeight: "600", fontSize: "90%" }}>
                  <span style={{ fontSize: "350%" }}>FREE</span> / FOREVER
                </p>
                <div className="content">
                  <p>
                    <IoMdCheckmark className="first tick" />
                    Components-driven system
                  </p>
                  <p>
                    <IoMdCheckmark className="first tick" />
                    Sales-boosting landing pages
                  </p>
                  <p>
                    <IoMdCheckmark className="first tick" />
                    Awesome Feather icons pack
                  </p>
                </div>
              </div>
              <button type="submit">Try for free</button>
            </div>
            <div className="card midcard">
              <div>
                <h3>Individual</h3>
                <p style={{ fontWeight: "600", fontSize: "90%" }}>
                  <span style={{ fontSize: "380%" }}>$24</span> / MONTH
                </p>
                <div className="content">
                  <p>
                    <IoMdCheckmark className="mid tick" />
                    Components-driven system
                  </p>
                  <p>
                    <IoMdCheckmark className="mid tick" />
                    Sales-boosting landing pages
                  </p>
                  <p>
                    <IoMdCheckmark className="mid tick" />
                    Awesome Feather icons pack
                  </p>
                  <p>
                    <IoMdCheckmark className="mid tick" />
                    Themed into 3 different styles
                  </p>
                  <p>
                    <IoMdCheckmark className="mid tick" />
                    Will help to learn Figma
                  </p>
                </div>
              </div>
              <button type="submit">Regular License</button>
            </div>
            <div className="card">
              <div>
                <h3>Corporate</h3>
                <p style={{ fontWeight: "600", fontSize: "90%" }}>
                  <span style={{ fontSize: "380%" }}>$12</span> / EDITOR
                </p>
                <div className="content">
                  <p>
                    <IoMdCheckmark className="last tick" />
                    Components-driven system
                  </p>
                  <p>
                    <IoMdCheckmark className="last tick" />
                    Sales-boosting landing pages
                  </p>
                  <p>
                    <IoMdCheckmark className="last tick" />
                    Awesome Feather icons pack
                  </p>
                  <p>
                    <IoMdCheckmark className="last tick" />
                    Themed into 3 different styles
                  </p>
                </div>
              </div>
              <button type="submit">Extended License</button>
            </div>
          </Container2>
          <Container3>
            <div style={{ fontSize: "110%" }}>
              <h1>Online coaching lessons for remote learning.</h1>
            </div>
            <div
              style={{
                fontSize: "120%",
                lineHeight: "1.2",
                textAlign: "center",
              }}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing
                elit, sed do eiusmod tempor Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum
                eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing
                elit, sed do eiusmod tempor Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div className="t3">
              <button type="submit">Start learning now</button>
            </div>
          </Container3>
          <Container4>
            {/* <h2>FAQ's</h2> */}
            <br />
            <br />
            <br />
            <div className="ques"></div>
          </Container4>
        </Container1>
        <Footer />
      </MidContainer>
    </Main>
  );
};

export default Membership;

const MidContainer = styled.div`
  width: 100%;
  margin-top: 90px;
  margin-left: 80px;
`;
const Container4 = styled.div``;
const Container3 = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  background-color: #252641;
  color: white;
  max-width: 1300px;
  padding: 50px 150px;
  border-radius: 40px;
  gap: 40px;
  .t3 > button {
    border: none;
    background-color: #49bbbd;
    color: white;
    height: 47px;
    border-radius: 14px;
    padding: 2px 20px;
    font-size: 18px;
    margin-top: 30px;
    font-weight: 600;
  }
`;
const Container2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px auto;
  gap: 10px;
  .card {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 420px;
    width: 330px;
    padding: 25px 30px;
    border-radius: 15px;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 30px;
      height: 47px;
      border: 2px solid #898989;
      background-color: transparent;
      border-radius: 10px;
      color: #49bbbd;
      font-size: 18px;
      font-weight: 600;
    }
    button:hover {
      cursor: pointer;
    }
    > div {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
  .content > p {
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 5px 0;
    display: flex;
    gap: 8px;
    font-size: 18px;
  }
  .tick {
    padding: 7px;
    font-size: 32px;
    border-radius: 50%;
  }
  .first {
    background-color: #e2e2e2;
  }
  .mid {
    background-color: #fdcb6e;
  }
  .last {
    background-color: #aef8e3;
  }
  .midcard {
    box-shadow: 0px 25px 50px -22px black;
    margin-right: 10px;
    > button {
      border: none;
      background-color: #49bbbd;
      color: white;
    }
  }
`;

const Main = styled.div`
  display: flex;
  position: sticky;
`;
const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
