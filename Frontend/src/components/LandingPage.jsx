import React, { useEffect } from "react";
import styled from "styled-components";
import logo from "../images/logo.jpg";
import logo1 from "../images/landing-page.png";
import logo2 from "../images/landing-2.png";
import logo3 from "../images/landing-instructor2.png";
import logo4 from "../images/landing-img1.png";
import instru from "../images/landing-instructor.png";
import stu from "../images/landing-student.png";
import { IoPlayCircle } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoReceiptOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import Footer from "./Footer";
import Course from "./Course";
import { FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Testimonialcard from "./Testimonialcard";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/dlearn/coursedata/")
      .then((response) => {
        setCourseData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Main>
      <Navbar>
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="right">
          <ul>
            <li>Home</li>
            <li>Course</li>
            <li>Career</li>
            <li>Blog</li>
            <li>About Us</li>
          </ul>
          <div className="btns">
            <Link to="/login">
              <button type="submit">Login</button>
            </Link>
            <Link to="/register">
              <button type="submit">Register</button>
            </Link>
          </div>
        </div>
      </Navbar>
      <Temp>
        <FirstContainer>
          <div className="left">
            <h1 style={{ fontSize: "45px", color: "white" }}>
              <span
                style={{ color: "#f48c06", WebkitTextStroke: "0.15px white" }}
              >
                Studying
              </span>{" "}
              online is now
              <br /> much easier
            </h1>
            <p style={{ color: "white", fontSize: "18px" }}>
              TOTC is an interesting platform that will teach <br /> you in more
              an interactive way
            </p>
            <div className="fbtn">
              <button
                type="submit"
                style={{
                  backgroundColor: "#7fcfd1",
                  padding: "12px 28px",
                  borderRadius: "25px",
                }}
              >
                Join for FREE
              </button>
              <button type="submit">
                <IoPlayCircle style={{ fontSize: "50px" }} /> Watch how it works
              </button>
            </div>
          </div>
          <div className="right">
            <img src={logo1} alt="" />
            <div className="b1">
              <FaRegCalendarAlt />
              <p>
                <h4>250k</h4>assisted students
              </p>
            </div>
            <div className="b2">
              <MdOutlineMailOutline
                style={{ color: "orange", fontSize: "24px" }}
              />
              <p>
                <h4>Congratulations</h4> Your admission is completed.
              </p>
            </div>
            <div className="b3">
              <CgProfile />
              <p>
                <h4>User Experience Class</h4>Today at 12:00 PM
              </p>
            </div>
          </div>
        </FirstContainer>
      </Temp>
      <SecondContainer>
        <h1>Our Success</h1>{" "}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem optio
          aut cumque. Rerum <br /> aut quia alias vel. Commodi iste officia
          fugit ratione praesentium totam. Nihil?
        </p>
        <div className="stats">
          <div>
            <h1>15K+</h1>
            <p>Students</p>
          </div>
          <div>
            <h1>75%</h1>
            <p>Total success</p>
          </div>
          <div>
            <h1>35</h1>
            <p>Main questions</p>
          </div>
          <div>
            <h1>15K+</h1>
            <p>Chief experts </p>
          </div>
          <div>
            <h1>16</h1>
            <p>Years of experience</p>
          </div>
        </div>
        <div className="last">
          <h1>
            All-In-One <span style={{ color: "#00cbb8" }}>Cloud Software.</span>
          </h1>
          <p style={{ lineHeight: "25px", margin: "25px", color: "#807f7f" }}>
            TOTC is one powerful online software suite that combines all the
            tools <br /> needed to run a successful school or office.
          </p>
        </div>
      </SecondContainer>
      <ThirdContainer>
        <div className="t1">
          <div
            style={{
              backgroundColor: "#5b72ee",
              borderRadius: "50%",
              padding: "10px",
              margin: "0 92px",
            }}
          >
            <IoReceiptOutline
              style={{
                fontSize: "33px",
                color: "white",
              }}
            />
          </div>

          <h2>Online Billing, Invoicing, & Contracts</h2>
          <p>
            Simple and secure control of your organization's financial and legal
            transactions. Send customized invoices and contracts
          </p>
        </div>
        <div className="t2">
          <div
            style={{
              backgroundColor: "#00cbb8",
              borderRadius: "50%",
              padding: "10px",
              margin: "0 92px",
            }}
          >
            <FaCalendarAlt
              style={{
                fontSize: "30px",
                color: "white",
              }}
            />
          </div>
          <h2>Easy Scheduling & Attendance Tracking</h2>
          <p>
            Schedule and reserve classrooms at one campus or multiple campuses.
            Keep detailed records of student attendance
          </p>
        </div>
        <div className="t3">
          <HiUserGroup
            style={{
              fontSize: "65px",
              color: "white",
              backgroundColor: "#29b9e7",
              borderRadius: "50%",
              padding: "15px",
            }}
          />
          <h2>Customer Tracking</h2>
          <p>
            Automate and track emails to individuals or groups. Skilline’s
            built-in system helps organize your organization{" "}
          </p>
        </div>
      </ThirdContainer>
      <FourthContainer>
        <div className="f">
          <div className="heading">
            <h1>
              What is <span style={{ color: "#00cbb8" }}>TOTC?</span>{" "}
            </h1>
            <p style={{ fontSize: "115%" }}>
              TOTC is a platform that allows educators to create online classes
              whereby they can store the course materials online; manage
              assignments, quizzes and exams; monitor due dates; grade results
              and provide students with feedback all in one place.
            </p>
          </div>
          <div className="imgs">
            <div>
              <img src={instru} alt="" />
              {/* <p>FOR INSTRUCTORS</p> */}
            </div>
            <div>
              <img src={stu} alt="" />
              <div>{/* <p>FOR STUDENTS</p> */}</div>
            </div>
          </div>
        </div>
      </FourthContainer>
      <FifthContainer>
        <div>
          <div className="l">
            <h2>
              Everything you can do in a physical classroom,{" "}
              <span style={{ color: "#00cbb8" }}>you can do with TOTC</span>
            </h2>
            <p>
              TOTC’s school management software helps traditional and online
              schools manage scheduling, attendance, payments and virtual
              classrooms all in one secure cloud-based system.
            </p>
            <p style={{ textDecoration: "underline" }}>Learn more</p>
          </div>
          <div className="r">
            <img src={logo2} alt="" />
          </div>
        </div>
      </FifthContainer>
      <Container6>
        <div>
          <div className="l">
            <h2>
              <span style={{ color: "#00cbb8" }}>Tools</span> For Teachers And
              Learners
            </h2>
            <p>
              Class has a dynamic set of teaching tools built to be deployed and
              used during class. Teachers can handout assignments in real-time
              for students to complete and submit.
            </p>
          </div>
          <div>
            <img src={logo3} alt="" />
          </div>
        </div>
      </Container6>
      <Container7>
        <div>
          <div className="l">
            <h2>
              Assessments, <br />
              <span style={{ color: "#00cbb8" }}>Quizzes, </span>
              Tests
            </h2>
            <p>
              Easily launch live assignments, quizzes, and tests. Student
              results are automatically entered in the online gradebook.
            </p>
          </div>
          <div>
            <img src={logo4} alt="" />
          </div>
        </div>
      </Container7>
      <Morebtn>
        <button type="button">See more features.</button>
      </Morebtn>
      <Container9>
        <div style={{ paddingLeft: "9%" }}>
          <h1>Explore Courses</h1>
          <p>Lorem ipsum dolor sit amet consectetur.</p> <br />
          <br />
          <br />
          <Container8>
            <div className="h">
              <h3>JEE Mains</h3>
              <div>
                <span>SEE ALL</span>
                <FaArrowRight className="hl" />
              </div>
            </div>
            <div className="wrapper">
              {courseData.map((item, key) =>
                item.domain === "JEE Mains" ? (
                  <div className="item">
                    <Course
                      key={key + item.domain}
                      id={item.id}
                      subject={item.subject}
                      content={item.topic}
                      teacher={
                        item.teacher.first_name + " " + item.teacher.last_name
                      }
                      chapters={item.no_of_chapters}
                    />
                  </div>
                ) : null
              )}
            </div>
          </Container8>
          <Container8>
            <div className="h">
              <h3>NEET</h3>
              <div>
                <span>SEE ALL</span>
                <FaArrowRight className="hl" />
              </div>
            </div>
            <div className="wrapper">
              {courseData.map((item, key) =>
                item.domain === "NEET" ? (
                  <div className="item">
                    <Course
                      key={key + item.domain}
                      id={item.id}
                      subject={item.subject}
                      content={item.topic}
                      teacher={
                        item.teacher.first_name + " " + item.teacher.last_name
                      }
                      chapters={item.no_of_chapters}
                    />
                  </div>
                ) : null
              )}
            </div>
          </Container8>
          <Container8>
            <div className="h">
              <h3>UPSC</h3>
              <div>
                <span>SEE ALL</span>
                <FaArrowRight className="hl" />
              </div>
            </div>
            <div className="wrapper">
              {courseData.map((item, key) =>
                item.domain === "UPSC" ? (
                  <div className="item">
                    <Course
                      key={key + item.domain}
                      id={item.id}
                      subject={item.subject}
                      content={item.topic}
                      teacher={
                        item.teacher.first_name + " " + item.teacher.last_name
                      }
                      chapters={item.no_of_chapters}
                    />
                  </div>
                ) : null
              )}
            </div>
          </Container8>
        </div>
        <div className="cont9bg"></div>
      </Container9>
      <Container10>
        <div>
          <div className="testimonial-container">
            <div className="line"></div>
            <span className="testimonial-text">TESTIMONIAL</span>
          </div>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Testimonialcard
                name="Alice Johnson"
                course="Web Development Bootcamp"
                feedback="This bootcamp was a game-changer for my career. The instructors were knowledgeable and the hands-on projects helped me build a strong portfolio. I highly recommend it!This bootcamp was a game-changer for my career. The instructors were knowledgeable and the hands-on projects helped me build a strong portfolio. I highly recommend it!"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Testimonialcard
                name="Mark Brown"
                course="Data Science with Python"
                feedback="The course was well-structured and covered all the important topics. The real-world examples made the learning experience very practical and enjoyable.The course was well-structured and covered all the important topics. The real-world examples made the learning experience very practical and enjoyable."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Testimonialcard
                name="Emily White"
                course="Graphic Design Masterclass"
                feedback="As a beginner, I found this course extremely helpful. The step-by-step tutorials and feedback from the instructor were invaluable. I now feel confident in my design skills.As a beginner, I found this course extremely helpful. The step-by-step tutorials and feedback from the instructor were invaluable. I now feel confident in my design skills."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Testimonialcard
                name="Michael Smith"
                course="Digital Marketing Strategy"
                feedback="This course provided me with the tools and knowledge to develop effective digital marketing strategies. The case studies were particularly useful in understanding real-world applications.This course provided me with the tools and knowledge to develop effective digital marketing strategies. The case studies were particularly useful in understanding real-world applications."
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </Container10>
      <Footer />
    </Main>
  );
};

export default LandingPage;

const Container10 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    max-width: 50%;
    margin-bottom: 100px;
  }
  .testimonial-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .line {
    height: 2px;
    background-color: #747474;
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    z-index: 1;
  }
  .testimonial-text {
    padding: 0 10px;
    background: white;
    color: #7f7f7f;
    font-size: 160%;
    z-index: 2;
  }
`;

const Container9 = styled.div`
  margin: 150px 0;
  .cont9bg {
    height: 1230px;
    background-color: #e1effe;
    margin-top: -1185px;
    margin-right: 22%;
    border-radius: 0 50px 50px 0;
  }
  .h {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    font-size: 110%;
    margin-bottom: -12px;
  }
  .hl {
    font-size: 38px;
    border-radius: 50%;
    padding: 8px;
  }
  .hl:hover {
    background-color: #a4cefa;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
`;
const Container8 = styled.div`
  .wrapper {
    padding: 30px;
    display: flex;
    gap: 25px;
    overflow-x: scroll;
  }
  .wrapper::-webkit-scrollbar {
    width: 0px;
  }
  .h > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    font-weight: 600;
    color: #12a5b9;
  }
`;
const Morebtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    background-color: #fff;
    border: 1px solid #00cbb8;
    color: #00cbb8;
    padding: 14px 28px;
    border-radius: 25px;
  }
  :hover {
    cursor: pointer;
  }
`;
const Container7 = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    padding: 0 100px;
    width: 1300px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    gap: 150px;
    img {
      height: 400px;
    }
    font-size: 115%;
    p {
      width: 400px;
      margin-top: 20px;
      color: grey;
      line-height: 1.4;
    }
  }
`;
const Container6 = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    padding: 0 100px;
    width: 1300px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 150px;
    img {
      height: 400px;
    }
    font-size: 115%;
    p {
      margin-top: 20px;
      color: grey;
      line-height: 1.4;
    }
  }
`;
const FifthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    gap: 50px;
    width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.4;
    .r > img {
      height: 340px;
    }
    .l > h2 {
      margin: 28px 0;
    }
    .l {
      font-size: 130%;
    }
  }
`;
const FourthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px auto;
  width: 720px;
  h1 {
    text-align: center;
    margin: 25px 0;
  }
  .imgs > div {
    position: relative;
    text-align: center;
    color: red;
  }
  .imgs > div > img {
    height: 240px;

    > div > p {
      /* position: absolute; */
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .imgs {
    margin: 25px auto;
    gap: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Main = styled.div`
  margin: 0;
  padding: 0;
  /* height: 200vh; */
  width: 100vw;
  .stknav {
    position: fixed;
  }
  img {
    height: 50px;
  }
`;

const Navbar = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  gap: 450px;
  top: 0;
  left: 0;
  margin: 20px 35px;
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 125px;
    > ul > li {
      list-style: none;
      margin: 0 35px;
      font-size: 22px;
    }
    > ul {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .btns {
      button {
        padding: 10px 20px;
        border: none;
        border-radius: 30px;
        margin: 0 15px;
        font-size: 20px;
      }
    }
  }
`;

const Temp = styled.div``;
const FirstContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 120px;
  height: 800px;
  border-radius: 0 0 50em 60em/13em;
  background-color: #49bbbd;
  overflow: hidden;
  .left {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 45px;
  }

  .right {
    > img {
      position: relative;
      bottom: -170px;
      height: 600px;
      object-fit: contain;
    }
  }
  .fbtn {
    display: flex;
    gap: 45px;
    > button {
      font-size: 20px;
      color: white;
      background-color: transparent;
      border: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    button:hover {
      cursor: pointer;
    }
  }
  .b1 {
    position: relative;
    top: -258px;
    left: 6px;
    width: 150px;
    transition: 0.3s ease-in-out;
  }
  .b2 {
    position: relative;
    top: -313px;
    left: 323px;
    width: 220px;
    transition: 0.3s ease-in-out;
  }
  .b3 {
    position: relative;
    width: 200px;
    top: -175px;
    left: 40px;
    transition: 0.3s ease-in-out;
  }
  .b1:hover {
    transform: scale(1.1);
  }
  .b2:hover {
    transform: scale(1.1);
  }
  .b3:hover {
    transform: scale(1.1);
  }
  .b1,
  .b2,
  .b3 {
    padding: 10px 15px;
    border-radius: 10px;
    color: white;
    backdrop-filter: blur(150px);
  }
`;

const SecondContainer = styled.div`
  margin: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  text-align: center;
  .stats {
    margin: 45px auto;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    > div > h1 {
      font-size: 60px;
      background: -webkit-linear-gradient(#5040ff, #00ffd5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    > div > p {
      font-size: 20px;
    }
  }
`;

const ThirdContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  .t1,
  .t2,
  .t3 {
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 0px 14px -4px #a4a4a4;
    height: 310px;
    width: 270px;
    padding: 20px 15px;
    p {
      margin: 15px 0px;
    }
    h2 {
      margin: 40px 0 10px 0;
    }
  }
`;
