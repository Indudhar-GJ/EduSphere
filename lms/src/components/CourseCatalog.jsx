import React, { useEffect } from "react";
import TopNavbar from "./TopNavbar";
import styled from "styled-components";
import SideNavbar from "./SideNavbar";
import Course from "./Course";
import { FaPaintbrush } from "react-icons/fa6";
import { FaDesktop } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { TbBulb } from "react-icons/tb";
import { FaCameraRetro } from "react-icons/fa";
import { FaThermometerThreeQuarters } from "react-icons/fa";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { TbWritingSign } from "react-icons/tb";
import Footer from "./Footer";

const CourseCatalog = () => {
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      console.log("not auth");
    }
  }, []);
  return (
    <div>
      <Main>
        <SideNavbar />
        <SecondContainer>
          <TopNavbar title="Course Catalog" />
          <ThirdContainer>
            <Options>
              <span>All</span>
              <span>Top 10</span>
              <span>Intresting</span>
              <span>Rated</span>
              <span>Newest</span>
            </Options>
            <CourseDetail>
              <div className="section">
                <Course
                  id="id"
                  subject="sub"
                  content="full content"
                  teacher="teach"
                />
                <div className="innersec">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>{" "}
                  <br />
                  <div>
                    <p>Price $4.99</p>
                    <p>Rating 4.7</p>
                  </div>
                </div>
              </div>
              <div className="section">
                <Course
                  id="id"
                  subject="sub"
                  content="full content"
                  teacher="teach"
                />
                <div className="innersec">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                  <br />
                  <div>
                    <p>Price $4.99</p>
                    <p>Rating 4.7</p>
                  </div>
                </div>
              </div>
              <div className="section">
                <Course
                  id="id"
                  subject="sub"
                  content="full content"
                  teacher="teach"
                />
                <div className="innersec">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                  <br />
                  <div>
                    <p>Price $4.99</p>
                    <p>Rating 4.7</p>
                  </div>
                </div>
              </div>
              <div className="section">
                <Course
                  id="id"
                  subject="sub"
                  content="full content"
                  teacher="teach"
                />
                <div className="innersec">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                  <br />
                  <div>
                    <p>Price $4.99</p>
                    <p>Rating 4.7</p>
                  </div>
                </div>
              </div>
              <div className="section">
                <Course
                  id="id"
                  subject="sub"
                  content="full content"
                  teacher="teach"
                />
                <div className="innersec">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                  <br />
                  <div>
                    <p>Price $4.99</p>
                    <p>Rating 4.7</p>
                  </div>
                </div>
              </div>
              <div className="section">
                <Course
                  id="id"
                  subject="sub"
                  content="full content"
                  teacher="teach"
                />
                <div className="innersec">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                  <br />
                  <div>
                    <p>Price $4.99</p>
                    <p>Rating 4.7</p>
                  </div>
                </div>
              </div>
              <div className="section">
                <Course
                  id="id"
                  subject="sub"
                  content="full content"
                  teacher="teach"
                />
                <div className="innersec">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                  <br />
                  <div>
                    <p>Price $4.99</p>
                    <p>Rating 4.7</p>
                  </div>
                </div>
              </div>
            </CourseDetail>
            <Container4>
              <h1>Courses from Top Catagory</h1>
              <div>
                <div className="box">
                  <FaPaintbrush
                    style={{
                      fontSize: "250%",
                      backgroundColor: "#cae5ff",
                      padding: "7px",
                      borderRadius: "5px",
                    }}
                  />
                  <h3>Design</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing Lorem,
                    ipsum dolor. elit.
                  </p>
                </div>
                <div className="box">
                  <FaDesktop
                    style={{
                      fontSize: "250%",
                      backgroundColor: "#cae5ff",
                      padding: "7px",
                      borderRadius: "5px",
                    }}
                  />
                  <h3>Development</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing Lorem,
                    ipsum dolor. elit.
                  </p>
                </div>
                <div className="box">
                  <FaShopify
                    style={{
                      fontSize: "250%",
                      backgroundColor: "#cae5ff",
                      padding: "7px",
                      borderRadius: "5px",
                    }}
                  />
                  <h3>Business</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing Lorem,
                    ipsum dolor. elit.
                  </p>
                </div>
                <div className="box">
                  <TbBulb
                    style={{
                      fontSize: "250%",
                      backgroundColor: "#cae5ff",
                      padding: "7px",
                      borderRadius: "5px",
                    }}
                  />
                  <h3>Marketing</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing Lorem,
                    ipsum dolor. elit.
                  </p>
                </div>
                <div className="box">
                  <FaCameraRetro
                    style={{
                      fontSize: "250%",
                      backgroundColor: "#cae5ff",
                      padding: "7px",
                      borderRadius: "5px",
                    }}
                  />
                  <h3>Photography</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing Lorem,
                    ipsum dolor. elit.
                  </p>
                </div>
                <div className="box">
                  <FaThermometerThreeQuarters
                    style={{
                      fontSize: "250%",
                      backgroundColor: "#cae5ff",
                      padding: "7px",
                      borderRadius: "5px",
                    }}
                  />
                  <h3>Medical</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing Lorem,
                    ipsum dolor. elit.
                  </p>
                </div>
                <div className="box">
                  <BsFillCameraReelsFill
                    style={{
                      fontSize: "250%",
                      backgroundColor: "#cae5ff",
                      padding: "7px",
                      borderRadius: "5px",
                    }}
                  />
                  <h3>Acting</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing Lorem,
                    ipsum dolor. elit.
                  </p>
                </div>
                <div className="box">
                  <TbWritingSign
                    style={{
                      fontSize: "250%",
                      backgroundColor: "#cae5ff",
                      padding: "7px",
                      borderRadius: "5px",
                    }}
                  />
                  <h3>Writing</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing Lorem,
                    ipsum dolor. elit.
                  </p>
                </div>
              </div>
            </Container4>
          </ThirdContainer>
          <Footer />
        </SecondContainer>
      </Main>
    </div>
  );
};

export default CourseCatalog;

const Container4 = styled.div`
  display: flex;
  flex-direction: column;
  > h1 {
    margin: 50px 50px;
  }
  > div {
    margin: auto 75px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18vw, 1fr));
    gap: 40px;
  }
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 55px;
    text-align: center;
    border-radius: 12px;
    box-shadow: 0px 7px 24px -16px black;
    gap: 15px;
    transition: 0.3s ease-in-out;
    > p {
      margin: 15px auto;
    }
  }
  .box:hover {
    transform: scale(1.04);
    cursor: pointer;
  }
`;
const Main = styled.div`
  display: flex;
`;
const SecondContainer = styled.div`
  margin-left: 80px;
  width: calc(100vw - 100px);
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const ThirdContainer = styled.div`
  margin: 15px 45px;
  margin-bottom: 80px;
`;
const Options = styled.div`
  span {
    border: 2px solid #b3b3b3;
    padding: 4px 18px;
    border-radius: 25px;
  }
  display: flex;
  gap: 10px;
`;
const CourseDetail = styled.div`
  display: flex;
  gap: 40px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin-right: -41px;
  ::-webkit-scrollbar {
    display: none;
  }
  .section {
    box-shadow: 1px 2px 10px black;
    border-radius: 14px 10px 8px 8px;
    width: 340px;
    margin: 65px 0 15px 0;
  }
  p {
    margin: 0;
  }
  .innersec {
    padding: 8px 12px 12px 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    > div {
      display: flex;
      justify-content: space-between;
    }
  }
`;
