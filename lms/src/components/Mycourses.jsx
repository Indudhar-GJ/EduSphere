import React, { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar";
import SideNavbar from "./SideNavbar";
import styled from "styled-components";
import img1 from "../images/Frame1305.jpg";
import { MdQuiz } from "react-icons/md";
import { GiConsoleController } from "react-icons/gi";
import { MdTimelapse } from "react-icons/md";
import { ReactComponent as ReadingIcon } from "../images/reading-icon.svg";
import CoursesHorizon from "./CoursesHorizon";
import { Scrollbars } from "react-custom-scrollbars-2";
import Course from "./Course";
import axios from "axios";

const Mycourses = () => {
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      console.log("not auth");
    }
  }, []);

  const [boughtCourses, setBoughtCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/dlearn/bought_courses/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setBoughtCourses(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bought courses:", error);
      });
  }, []);

  const [topCourses, setTopCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/dlearn/top5_courses/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setTopCourses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching unbought courses:", error);
      });
  }, []);

  return (
    <Main>
      <SideNavbar />
      <SecondContainer>
        <TopNavbar title="My Courses" />
        <hr />
        <ThirdContainer>
          <Left>
            <div className="progress">
              <img src={img1} alt="" />
            </div>
            <h3>All Stats</h3>
            <div className="course-stats">
              <div
                className="box1"
                style={{ border: "none", paddingLeft: "40px" }}
              >
                <ReadingIcon style={{ color: "#56ccf2" }} />
                <span> 3/7 courses</span>
              </div>
              <div className="box2">
                <MdQuiz style={{ color: "#56ccf2" }} />
                <span>30/70 quizzes</span>
              </div>
              <div className="box3">
                <GiConsoleController style={{ color: "#56ccf2" }} />
                <span>2 prototypes</span>
              </div>
              <div className="box4">
                <MdTimelapse style={{ color: "#56ccf2" }} />
                <span>2 hours learning</span>
              </div>
            </div>
            <div className="enrolledcourses">
              <h3>Enrolled Courses</h3>
              <div className="ecdetail" style={{ margin: "0px 15px" }}>
                {boughtCourses.map((item, index) => (
                  <>
                    <CoursesHorizon
                      key={item.id}
                      id={item.id}
                      title={item.topic}
                      subject={item.subject}
                    />
                    <hr />
                  </>
                ))}
              </div>
            </div>
          </Left>
          <Right>
            <h2>Top Rated Courses</h2>
            <Scrollbars autoHide>
              {topCourses.map((item, index) => (
                <div className="topCourse">
                  <Course
                    key={item}
                    id={item.id}
                    subject={item.subject}
                    content={item.topic}
                    chapters={item.no_of_chapters}
                    teacher={
                      item.teacher.first_name + " " + item.teacher.last_name
                    }
                  />
                </div>
              ))}
            </Scrollbars>
          </Right>
        </ThirdContainer>
      </SecondContainer>
    </Main>
  );
};

export default Mycourses;

const Main = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
`;
const SecondContainer = styled.div`
  margin-left: 80px;
`;
const ThirdContainer = styled.div`
  margin: 15px 35px;
  display: grid;
  grid-template-columns: 9fr 4fr;
  gap: 100px;
  /* margin-top: 80px; */
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-left: 25px;
  .progress > img {
    width: 100%;
  }
  .course-stats {
    box-shadow: 0px 3px 10px #a8a8a8;
    border: 2px solid #b1b1b1;
    border-radius: 5px;
    padding: 15px 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    > div {
      padding: 5px 5px;
      padding-left: 70px;
      border-left: 2px solid #b4b2b2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      font-size: 35px;
      span {
        font-size: 20px;
      }
    }
  }
`;
const Right = styled.div`
  margin-left: 50px;
  display: flex;
  /* justify-content: center; */
  align-items: start;
  flex-direction: column;
  .topCourse {
    margin: 20px 0;
  }
  overflow-y: auto;
  height: 85vh;
  /* margin-top: -55px; */
`;
