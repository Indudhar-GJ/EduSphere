import React from "react";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

const BlurPopup = (props) => {
  return props.trigger ? (
    <Main>
      <div className="popup">
        <div className="popup-inner">
          {props.img ? (
            <img
              src={props.img}
              alt=""
              style={{ zIndex: "-5", opacity: "0.7", width: "640px" }}
            />
          ) : null}
          {/* <span>
            <IoClose
              className="closebtn"
              onClick={() => {
                props.setTrigger(false);
              }}
            />
          </span> */}
          {props.children}
        </div>
      </div>
    </Main>
  ) : (
    ""
  );
};

export default BlurPopup;

const Main = styled.div`
  position: absolute;
  top: 100px;
  left: 25vw;
  .popup {
    width: calc(100vw - 26vw);
    height: calc(100vh - 100px);
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup-inner {
    border-radius: 15px;
    position: relative;
    padding: 32px;
    /* width: 100%; */
    max-width: 640px;
    background-color: #fff;
    .timg {
      height: 290px;
    }
  }
  .closebtn {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }
`;
