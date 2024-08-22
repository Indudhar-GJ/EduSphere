import React from "react";
import styled from "styled-components";

const Testimonialcard = ({ name, course, feedback }) => {
  return (
    <First>
      <Sec>
        <h2>
          Name : <span style={{ fontWeight: "500" }}>{name}</span>
        </h2>
        <h2>
          Course : <span style={{ fontWeight: "500" }}>{course}</span>
        </h2>
        <p>{feedback}</p>
      </Sec>
    </First>
  );
};

export default Testimonialcard;

const First = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 120%;
`;
const Sec = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 25px;
  max-width: 700px;
  p {
    line-height: 1.5;
  }
`;
