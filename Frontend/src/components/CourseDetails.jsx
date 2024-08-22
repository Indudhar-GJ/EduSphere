import React, { useEffect, useState } from "react";
import SideNavbar from "./SideNavbar";
import styled from "styled-components";
import logo from "../images/coursedetail1.png";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import Course from "./Course";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { MdOutlineQuiz } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { getUserCart, addItemToCart, removeItemFromCart } from "./CartServices";

const CourseDetails = () => {
  const [topCourses, setTopCourses] = useState([]);
  const [infoTab, setInfoTab] = useState("Teacher");
  const [courseInfo, setCourseInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      console.log("not auth");
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/dlearn/top5_courses/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setTopCourses(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching unbought courses:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/dlearn/courses/${id}/`)
      .then((response) => {
        setCourseInfo(response.data[0]);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching unbought courses:", error);
      });
  }, []);
  const [cart, setCart] = useState(null);

  const handleAddItem = async (courseId, quantity) => {
    try {
      if (cart) {
        const response = await addItemToCart(cart.id, courseId, quantity);
        const updatedCart = {
          id: response.data.cart_id,
          courseIds: response.data.course_ids,
        };
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getUserCart();
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    };
    fetchCart();
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
              <button type="submit" onClick={() => setInfoTab("Overview")}>
                Overview
              </button>
              <button
                type="submit"
                onClick={() => setInfoTab("Course Chapters")}
              >
                Course Chapters
              </button>
              <button type="submit" onClick={() => setInfoTab("Teacher")}>
                Teacher
              </button>
              <button
                type="submit"
                onClick={() => setInfoTab("Why This Course?")}
              >
                Why This Course?
              </button>
            </div>
            {infoTab == "Overview" && (
              <div
                className="info"
                style={{
                  color: "black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <p style={{ fontSize: "140%" }}>
                    Subject : {courseInfo?.subject}
                  </p>
                  <p style={{ fontSize: "140%" }}>
                    Topic : {courseInfo?.topic}
                  </p>
                  <p style={{ fontSize: "140%" }}>
                    More than {courseInfo?.no_of_registrations - 1} people have
                    bought this course
                  </p>
                </div>
              </div>
            )}
            {infoTab == "Course Chapters" && (
              <div
                className="info"
                style={{
                  color: "black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <h2>Chapters in this course are</h2>
                {courseInfo?.chapters?.map((item, index) => (
                  <>
                    <p>
                      Chapter {index + 1}{" "}
                      <h3 key={index}>{item.chapter_title}</h3>
                    </p>
                  </>
                ))}
              </div>
            )}
            {infoTab == "Teacher" && (
              <div
                className="info"
                style={{
                  color: "black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <p style={{ fontSize: "140%" }}>
                    First Name : {courseInfo?.teacher?.first_name}
                  </p>
                  <p style={{ fontSize: "140%" }}>
                    Last Name : {courseInfo?.teacher?.last_name}
                  </p>
                  <p style={{ fontSize: "140%" }}>
                    Email-Id : {courseInfo?.teacher?.email}
                  </p>
                </div>
              </div>
            )}
            {infoTab == "Why This Course?" && (
              <div
                className="info"
                style={{
                  gap: "10%",
                  alignItems: "center",
                }}
              >
                <div className="box">
                  <MdOutlineQuiz />
                  <p>More than {courseInfo?.chapters?.length * 5} quizzes</p>
                </div>
                <div className="box">
                  <MdOutlineOndemandVideo />
                  <p>
                    More than{" "}
                    {courseInfo?.chapters?.reduce(
                      (total, item) => total + (item.time_to_complete || 0),
                      0
                    )}{" "}
                    hours of content
                  </p>
                </div>
                <div className="box">
                  <IoPerson />
                  <p>
                    This course is handled by our top faculty{" "}
                    {courseInfo?.teacher?.first_name +
                      " " +
                      courseInfo?.teacher?.last_name}
                  </p>
                </div>
              </div>
            )}
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
                      &#8377; {courseInfo?.price}
                    </span>
                  </p>
                </div>
                <p
                  style={{
                    textAlign: "center",
                    color: "#49bbbd",
                    margin: "18px 0",
                  }}
                >
                  Rated {courseInfo?.rating} out of 5
                </p>
                <button onClick={() => handleAddItem(id, 1)} type="submit">
                  Add To Cart
                </button>
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
                  <li>In-depth Knowledge</li>
                  <li>Access on all devices</li>
                  <li>Quizzes to evaluvate yourself</li>
                  <li>{courseInfo?.chapters?.length} Chapters</li>
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
        <Container3>
          <h2>Top Courses : </h2>
          <div className="courses-list">
            <div className="inside-list">
              {topCourses.map((item, index) => (
                <div key={index} className="topCourse">
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
            </div>
          </div>
        </Container3>
        <Footer />
      </FirstContainer>
    </Main>
  );
};

export default CourseDetails;

const Container3 = styled.div`
  margin-bottom: 25px;
  margin-left: 25px;
  .inside-list {
    margin-left: 250px;
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  .courses-list {
    overflow-x: scroll;
    /* width: 100%; */
    padding: 30px;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
    .topCourse {
      /* margin-left: 25px; */
    }
  }
`;

const Left = styled.div`
  min-height: 700px;
  .info {
    display: flex;
    justify-content: center;
    min-height: 400px;
    background-color: #e2f0ff;
    margin: 50px 20px;
    padding: 50px;
    border-radius: 15px;
    width: 100%;
  }
  .box {
    background-color: #a6d1ff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 250%;
    padding: 25px 60px;
    width: 100%;
    min-height: 200px;
    border-radius: 15px;
    p {
      font-size: 45%;
    }
  }
  margin-left: 6vw;
  padding: 50px 10px;
  /* background-color: red; */
  width: 60%;
  .btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    button {
      cursor: pointer;
      padding: 12px 23px;
      font-size: 100%;
      border-radius: 8px;
      border: none;
    }
  }
`;
const Right = styled.div`
  .c11 {
    position: absolute;
    right: 55px;
    top: 350px;
    width: 330px;
    > img {
      width: inherit;
      height: 208px;
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
