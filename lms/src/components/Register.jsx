import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../images/register-image.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/register/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Main>
      <img src={logo} alt="" />
      <Right onSubmit={submitHandler}>
        <p>Welcome To Page</p>
        <div className="select-type">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
        <div className="form">
          <div className="mail">
            <p>First name</p>
            <input
              type="text"
              name="fname"
              onChange={handleChange}
              placeholder="Enter your First Name"
            />
          </div>
          <div className="mail">
            <p>Last name</p>
            <input
              type="text"
              name="lname"
              onChange={handleChange}
              placeholder="Enter your Last Name"
            />
          </div>
          <div className="usn">
            <p>Username</p>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Enter your Username"
            />
          </div>
          <div className="psw">
            <p>Password</p>
            <input
              type="text"
              name="password"
              onChange={handleChange}
              placeholder="Enter your Password"
            />
          </div>
        </div>
        <div className="last">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "5px",
            }}
          ></div>
        </div>
        <button type="submit">Register</button>
      </Right>
    </Main>
  );
};

export default Register;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 180px;
  height: 95vh;
  width: 95vw;
`;

const Right = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  font-size: 25px;
  .form > div > p {
    margin: 10px;
    margin-top: 15px;
  }
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
