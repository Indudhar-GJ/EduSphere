import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Sector } from "recharts";
import Course from "./Course";
import Event from "./Event";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import "./axios";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const Dashboard = () => {
  const PieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const LineData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      console.log("not auth");
    }
  }, []);

  return (
    <div>
      <MainContainer>
        <SideNavbar />
        <SecondContainer>
          <TopNavbar title="Dashboard" />
          <ThirdContainer>
            <Left>
              <h3>OVERVIEW</h3>
              <Stats>
                <div className="box">
                  <p className="title">Courses in progress</p> <br />
                  <p className="content">3</p>
                </div>
                <div className="box">
                  <p className="title">Active Prototype</p>
                  <br />
                  <p className="content">7</p>
                </div>
                <div className="box">
                  <p className="title">Hours Learning</p>
                  <br />
                  <p className="content">3h 15m</p>
                </div>
                <div className="box">
                  <p className="title">Community Score</p>
                  <br />
                  <p className="content">270</p>
                </div>
              </Stats>
              <Stat2>
                <div className="chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={500}
                      height={200}
                      data={LineData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={200} height={200}>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={PieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Stat2>
            </Left>
            <Right>
              <h3>LIVE EVENTS</h3>
              <div className="live"></div>
              <div className="allevents">
                <Event />
                <Event />
                <Event />
                <Event />
              </div>
            </Right>
            <FourthContainer>
              <h3>My Courses</h3>
              <div className="mycourses">
                <Course
                  id="id"
                  subject="sub"
                  content="full content"
                  teacher="teach"
                />
                <Course
                  id="id"
                  subject="sub"
                  content="full content"
                  teacher="teach"
                />
                <Course
                  id="id"
                  subject="sub"
                  content="full content"
                  teacher="teach"
                />
              </div>
            </FourthContainer>
          </ThirdContainer>
        </SecondContainer>
      </MainContainer>
    </div>
  );
};

export default Dashboard;

const MainContainer = styled.div`
  display: flex;
`;

const SecondContainer = styled.div`
  margin-left: 100px;
`;

const ThirdContainer = styled.div`
  display: grid;
  grid-template-columns: 9fr 4fr;
  gap: 10px;
  h3 {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 20px;
  }
`;
const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  .box {
    border: 2px solid grey;
    border-radius: 5px;
    padding-left: 20px;
    padding-right: 50px;
    padding-top: 8px;
    padding-bottom: 8px;
    /* padding: 0; */
    margin: 0;
  }
  .title {
    font-size: 18px;
    margin: 0;
    padding: 0;
  }
  .content {
    font-weight: 500;
    margin: 0;
    padding: 0;
    font-size: 25px;
    text-align: start;
  }
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;
const Right = styled.div``;
const Stat2 = styled.div`
  display: grid;
  grid-template-columns: 7fr 4fr;
  margin-top: 15px;
  width: 100%;
  height: 280px;
  gap: 10px;
  .chart {
    padding: 15px 0;
    border: 2px solid #ababab;
    border-radius: 5px;
  }
`;

const FourthContainer = styled.div`
  h3 {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 20px;
  }
  .mycourses {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 8px;
    margin-left: 5px;
  }
`;
