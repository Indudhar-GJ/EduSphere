import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../images/register-image.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verifyOtp, setVerifyOtp] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async () => {
    // e.preventDefault();
    const toastId = toast.loading("Verifying OTP...");
    // setFormData({
    //   ...formData,
    //   [otp]: otp,
    // });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
          fname: formData.fname,
          lname: formData.lname,
          username: formData.username,
          password: formData.password,
          email: formData.email,
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.status === "200") {
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
        });
        setTimeout(() => {
          toast.dismiss(toastId);
          navigate("/login");
        }, 2500);
      } else {
        toast.update(toastId, {
          render: response.data.message,
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 2500);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.detail);
      } else {
        console.log("An error occurred");
      }
    }
  };

  const sendOtp = async () => {
    const toastId = toast.loading("Sending OTP...");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/generate_otp/",
        {
          email: formData.email,
        }
      );
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2500);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.detail);
      } else {
        console.log("An error occurred");
      }
    }
  };
  const check = async () => {
    const toastId = toast.loading("Sending OTP...");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/check_otp/",
        {
          otp: otp,
        }
      );
      if (response.data.status === 200) {
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
        });
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 2500);
      } else {
        toast.update(toastId, {
          render: response.data.message,
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 2500);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.detail);
      } else {
        console.log("An error occurred");
      }
    }
  };

  return (
    <Main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />

      <img src={logo} alt="" />
      <Right>
        {!verifyOtp && (
          <div className="f">
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
              <div className="mail">
                <p>Email Id</p>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your Email-Id"
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
            <button
              onClick={() => {
                setVerifyOtp(true);
                sendOtp();
              }}
              type="submit"
            >
              Register
            </button>
          </div>
        )}
      </Right>
      <Right2>
        {verifyOtp && (
          <div className="sec">
            <>
              <div>
                <p>Enter OTP sent to E-mail ID</p>
                <br />
                <div className="oin">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span></span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p
                    onClick={() => {
                      setVerifyOtp(false);
                    }}
                    style={{
                      fontSize: "100%",
                      marginTop: "15px",
                      cursor: "pointer",
                    }}
                  >
                    Wrong email-id??
                  </p>
                  <p
                    onClick={() => {
                      sendOtp();
                    }}
                    style={{
                      fontSize: "100%",
                      marginTop: "15px",
                      cursor: "pointer",
                    }}
                  >
                    Resend OTP
                  </p>
                </div>
                <button
                  onClick={() => {
                    submitHandler();
                    // check();
                  }}
                  type="button"
                >
                  Verify OTP
                </button>
              </div>
            </>
          </div>
        )}
      </Right2>
    </Main>
  );
};

export default Register;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  height: 95vh;
  width: 98vw;
  img {
    height: 90vh;
  }
`;

const Right2 = styled.form`
  div p {
    font-size: 150%;
  }
  .oin * {
    display: flex;
    gap: 10px;
    font-size: 150%;
    border-color: #49bbbd;
  }
  .sec div button {
    margin-top: 50px;
    height: 50px;
    width: 300px;
    padding: 25px;
    border-radius: 25px;
    border: 2px solid #49bbbd;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 120%;
    background-color: #49bbbd;
    color: white;
    cursor: pointer;
  }
`;
const Right = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 85px;
  font-size: 25px;
  margin: 0 100px;
  margin-right: -70px;
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }
  .f {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
