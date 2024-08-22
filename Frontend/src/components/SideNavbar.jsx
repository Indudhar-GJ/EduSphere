import React from "react";
import logo from "../images/logo.jpg";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { RiLiveFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";

const SideNavbar = () => {
  const logoutfunc = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/logout/",
        {
          refresh_token: localStorage.getItem("refresh_token"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      localStorage.clear();
      axios.defaults.headers.common["Authorization"] = null;
      window.location.href = "/login";
    } catch (e) {
      console.log("logout not working", e);
    }
  };

  return (
    <Main>
      <SideNav>
        <img src={logo} alt="logo" />
        <Buttons>
          <div>
            <div className="dash-icon">
              <Link to="/dashboard">
                <LuLayoutDashboard className="" />
              </Link>
            </div>
          </div>
          <div>
            <div className="course-icon">
              <Link to="/mycourses">
                <FaGraduationCap className="" />
              </Link>
            </div>
            <div className="idea-icon">
              <Link to="/search">
                <IoMdSearch className="" />
              </Link>
            </div>
            <div className="msg-icon">
              <MdMessage className="" />
            </div>
            <div className="live-icon">
              <RiLiveFill className="" />
            </div>
          </div>
          <div>
            <div className="profile-icon">
              <CgProfile className="profile-icon-icon" />
              <ul>
                <li className="drop-items">
                  <a href="#">Profile</a>
                </li>
                <li className="drop-items">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="drop-items">
                  <Link to="/pricing">Membership</Link>
                </li>
                <li className="drop-items">
                  <a href="#">
                    <button onClick={logoutfunc}>Logout</button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Buttons>
      </SideNav>
    </Main>
  );
};

export default SideNavbar;

const Main = styled.div`
  display: flex;
  position: fixed;
`;

const SideNav = styled.div`
  img {
    height: 70px;
  }
  background-color: black;
  height: 100vh;
  width: 80px;
  .dash-icon:hover,
  .course-icon:hover,
  .idea-icon:hover,
  .msg-icon:hover,
  .live-icon:hover,
  .profile-icon:hover {
    background-color: #56ccf2;
  }
  .dash-icon:active,
  .course-icon:active,
  .idea-icon:active,
  .msg-icon:active,
  .live-icon:active,
  .profile-icon:active {
    /* background-color: #009b6f; */
  }
  .dash-icon,
  .course-icon,
  .idea-icon,
  .msg-icon,
  .live-icon,
  .profile-icon {
    border-radius: 5px;
    color: white;
    transition: 0.2s;
    padding: 12px 10px;
    > * {
      border-radius: 5px;
      color: white;
      transition: 0.2s;
    }
  }

  .profile-details {
    height: 200px;
    width: 150px;
    background-color: green;
    display: none;
    bottom: 100px;
    left: 205px;
  }
  /* .profile-icon:hover {
    .profile-details {
      display: block;
    }
  } */
`;
const Buttons = styled.div`
  /* styles.css */

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  color: white;
  font-size: 20px;
  height: 85%;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
  }
  .profile-icon {
    position: relative;
  }
  .profile-icon ul {
    background-color: #56ccf2;
    color: white;
    position: absolute;
    left: 42px;
    bottom: 0px;
    display: none;
    padding: 20px 20px;
    width: 240px;
    height: 235px;
    border-radius: 10px;
    list-style: none;
  }

  .profile-icon:hover ul {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    opacity: 1;
    z-index: 2;
    li {
      opacity: 0;
      transform: translateY(20px);
      animation: slideIn 0.5s forwards;
    }
    @keyframes slideIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    li:nth-child(4) {
      animation-delay: 0.1s;
    }
    li:nth-child(3) {
      animation-delay: 0.2s;
    }
    li:nth-child(2) {
      animation-delay: 0.3s;
    }
    li:nth-child(1) {
      animation-delay: 0.4s;
    }

    li * {
      font-size: 20px;
      color: white;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 155%;
      border-radius: 8px;
    }
    li button {
      font-size: 18px;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    li a {
      text-decoration: none;
    }
    a,
    button {
      width: auto;
    }

    li:hover {
      background-color: #4097b4;
      cursor: pointer;
      transition: 0.2s ease-in-out;
    }
  }
`;
