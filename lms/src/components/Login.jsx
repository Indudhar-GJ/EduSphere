import React, { useState, useRef } from "react";
import logo from "../images/login-image.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { csrfToken } from "./csrf";
import axios from "axios";
import OTPInput from "react-otp-input";
// import { clickAnimation } from "./clickAnimation";

const Login = () => {
  // const buttonRef = useRef();
  // clickAnimation(buttonRef, {});
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [forgotPass, setForgotPass] = useState(false);
  // const [enterOtp, setEnterOtp] = useState(false);
  const [otp, setOtp] = useState("");
  // const [canChangePass, setCanChangePass] = useState(false);
  const [formDisplay, setFormDisplay] = useState("login");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

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
    navigate("/dashboard");
  };

  const sendForgotPass = async () => {
    const toastId = toast.loading("Sending OTP...");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/forgot_password/",
        {
          email: email,
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
        // setEnterOtp(true);
        setFormDisplay("EnterOTP");
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

  const checkOtp = async () => {
    const toastId = toast.loading("Sending OTP...");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/check_otp_forgot_password/",
        {
          email: email,
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
        // setCanChangePass(true);
        setFormDisplay("EnterNewPass");
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
  const change_pass_forgot = async () => {
    const toastId = toast.loading("Updating Password...");
    if (newPass !== confirmNewPass) {
      toast.update(toastId, {
        render: "Password mismatch!",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2500);
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/change_password/",
        {
          email: email,
          password: newPass,
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
        // setCanChangePass(true);
        setFormDisplay("EnterNewPass");
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
        });
        setTimeout(() => {
          navigate(0);
          toast.dismiss(toastId);
        }, 1000);
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
      <ToastContainer />
      <img src={logo} alt="" />
      {formDisplay == "login" && (
        <Right>
          <p>Welcome To Page</p>
          <div className="select-type">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
          <form className="form">
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
              <Link
                onClick={() => {
                  // setForgotPass(true);
                  setFormDisplay("EnterEmail");
                }}
                to="/login"
              >
                Forgot Password?
              </Link>
            </div>
            <button onClick={submit} type="submit">
              Login
            </button>
          </form>
        </Right>
      )}
      <Right2>
        {formDisplay == "EnterEmail" && (
          <>
            <h3>Enter the Email-Id linked with your account</h3>
            <input
              style={{ fontSize: "100%" }}
              placeholder="Enter Email ID"
              type="email"
              name=""
              id="emailinp"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button
              onClick={() => {
                sendForgotPass();
              }}
              type="button"
            >
              Send OTP
            </button>
          </>
        )}
        {formDisplay == "EnterOTP" && (
          <>
            <div>
              <h3>Enter OTP sent to E-mail ID</h3>
              <br />
              <div className="oin">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span></span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p
                  onClick={() => {
                    setFormDisplay("EnterEmail");
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
                    sendForgotPass();
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
                  checkOtp();
                }}
                type="button"
              >
                Verify OTP
              </button>
            </div>
          </>
        )}
        {formDisplay == "EnterNewPass" && (
          <>
            <div className="newpsw">
              <h2>Enter the new Password</h2>
              <input
                placeholder="Enter New Password"
                type="text"
                name="pswrd"
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
              />
              <input
                placeholder="Confirm Password"
                type="text"
                name="confirmpswrd"
                onChange={(e) => {
                  setConfirmNewPass(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  change_pass_forgot();
                }}
                type="button"
              >
                Change Password
              </button>
            </div>
          </>
        )}
      </Right2>
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
  img {
    height: 93%;
  }
`;

const Right2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  .newpsw {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
  }
  .newpsw input {
    font-size: 95%;
    height: 55px;
    width: 350px;
    padding: 25px;
    border-radius: 25px;
    border: 2px solid #49bbbd;
  }
  .oin * {
    border-radius: 0;
    display: flex;
    gap: 10px;
    font-size: 150%;
    border-color: #49bbbd;
  }
  #emailinp {
    height: 55px;
    width: 400px;
    padding: 25px;
    border-radius: 25px;
    border: 2px solid #49bbbd;
  }
  button {
    margin-top: 7px;
    font-size: 20px;
    background-color: #49bbbd;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 11px 45px;
  }
  button:hover {
    transition: 0.3s ease-in-out;
    background-color: #359b9c;
    cursor: pointer;
  }
`;
const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  font-size: 25px;
  .usn,
  .psw {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-bottom: 18px;
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
