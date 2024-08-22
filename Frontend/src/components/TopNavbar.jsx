import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { VscBell, VscBellDot } from "react-icons/vsc";
import styled from "styled-components";

const TopNavbar = ({ title }) => {
  const [Notification, setNotification] = useState(0);
  return (
    <div>
      <TopNav>
        <h1 style={{ fontSize: "260%" }}>{title}</h1>
        <TopNavRight>
          <div className="search">
            <input type="text" name="" id="serch" placeholder="search" />
            <IoMdSearch />
          </div>
          {Notification > 0 ? <VscBellDot /> : <VscBell />}
          <IoSettingsOutline />
        </TopNavRight>
      </TopNav>
    </div>
  );
};

export default TopNavbar;

const TopNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 25px;
  height: 90px;
`;
const TopNavRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding-right: 50px;
  font-size: 24px;
  .search {
    input {
      border: none;
      outline: none;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid grey;
    padding: 2px;
    border-radius: 5px;
  }
`;
