import React, { useState } from "react";
import logo from "../images/login-image.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { csrfToken } from "./csrf";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Create the submit method.
  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    // Create the POST requuest
    const { data } = await axios.post("http://localhost:8000/token/", user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    localStorage.setItem("username", user.username);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
    window.location.href = "/dashboard";
  };

  return (
    <Main>
      <ToastContainer />
      <img src={logo} alt="" />
      <Right>
        <p>Welcome To Page</p>
        <div className="select-type">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
        <form onSubmit={submit} className="form">
          <div className="usn">
            <p>Username</p>
            <input
              type="text"
              placeholder="Enter your Username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="psw">
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="last">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "5px",
              }}
            >
              <input type="checkbox" name="remember" id="chkbx" />{" "}
              <span style={{ margin: "0px 8px" }}>Remember me</span>
            </div>
            <Link to="/login">Forgot Password?</Link>
          </div>
          <button type="submit">Login</button>
        </form>
      </Right>
    </Main>
  );
};

export default Login;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 180px;
  height: 95vh;
  width: 95vw;
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  font-size: 25px;
  input {
    height: 55px;
    width: 400px;
    padding: 25px;
    border-radius: 25px;
    border: 2px solid #49bbbd;
  }
  .select-type {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 55px;
    > a {
      color: white;
      text-decoration: none;
    }
    padding: 15px 25px;
    border-radius: 45px;
    background-color: #49bbbd7b;
  }
  .last {
    font-size: 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 130px;
    > a {
      color: black;
      text-decoration: none;
    }
  }
  input {
    margin: 0;
    font-size: 16px;
  }
  #chkbx {
    padding: 0;
    height: 22px;
    width: 22px;
  }
  button {
    font-size: 25px;
    background-color: #49bbbd;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 7px 40px;
  }
  button:hover {
    transition: 0.3s ease-in-out;
    background-color: #359b9c;
    cursor: pointer;
  }
`;
