import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import SideNavbar from "./SideNavbar";
import logo from "../images/searchImg.png";
import axios from "axios";
import Course from "./Course";
import Footer from "./Footer";
import { TailSpin } from "react-loader-spinner";
import Popup from "./Popup";

const Search = () => {
  const [query, setQuery] = useState("");
  const [teacher, setTeacher] = useState("");
  const [domain, setDomain] = useState("");
  const [chapter, setChapter] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    uniteachers: [],
    unidomains: [],
    unimax_chapter: 0,
    unimax_price: 0,
  });
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      console.log("not auth");
    }
  }, []);

  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/dlearn/search/unique/`
        );
        setFilters(response.data);
      } catch (err) {
        console.error("Failed to fetch filters", err);
      }
      setLoading(false);
    };

    fetchFilters();
  }, []);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8000/dlearn/search/`, {
        params: {
          q: query,
          teacher: teacher,
          chapter: chapter,
          domain: domain,
          max_price: maxPrice,
        },
      });
      setResults(response.data);
    } catch (err) {
      setError("Failed to fetch courses");
      console.error("Failed to fetch courses", err);
    } finally {
      setLoading(false);
    }
  }, [query, teacher, chapter, domain, maxPrice]);

  return (
    <Main>
      <SideNavbar />
      <Container1>
        <Container2>
          <img src={logo} alt="" />
          <div className="searchbox">
            <div className="f">
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Course Name or Course Title..."
              />
              <button onClick={handleSearch} disabled={loading} type="submit">
                Search
              </button>
            </div>
            <div className="s">
              <div className="Chapter">
                <select
                  id="dropdown"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                >
                  <option value="">Chapters</option>
                  {Array.from(
                    { length: filters?.unimax_chapter },
                    (_, number) => (
                      <option key={number} value={number}>
                        {number + 1}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="Teacher">
                <select
                  id="dropdown"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                >
                  <option value="">Teacher</option>
                  {filters.uniteachers.map((teacher) => (
                    <option key={teacher} value={teacher}>
                      {teacher}
                    </option>
                  ))}
                </select>
              </div>
              <div className="Domain">
                <select
                  id="dropdown"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                >
                  <option value="">Domain</option>
                  {filters.unidomains.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>
              <div className="Price">
                <select
                  id="dropdown"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                >
                  <option value="">Price</option>
                  {Array.from(
                    { length: filters?.unimax_price },
                    (_, number) => (
                      <option key={number} value={number}>
                        {number + 1}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
        </Container2>
        <Container3>
          <h2>Fetched these results :</h2>
          {error && <p>{error}</p>}
          {loading ? (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: "50px 80px",
              }}
            >
              <Popup trigger={loading} setTrigger={setLoading}>
                <TailSpin
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  visible={true}
                />
              </Popup>
            </p>
          ) : (
            <div className="results">
              {results.map((course) => (
                <Course
                  key={course.id}
                  id={course.id}
                  subject={course.subject}
                  content={course.topic}
                  teacher={`${course.teacher.first_name} ${course.teacher.last_name}`}
                  chapters={course.chapters.length}
                />
              ))}
            </div>
          )}
        </Container3>
        <Footer />
      </Container1>
    </Main>
  );
};

export default Search;

const Container3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 45px;
  padding: 25px 50px;
  .results {
    padding: 25px 35px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 45px;
  }
`;

const Main = styled.div``;
const Container1 = styled.div`
  padding-left: 4vw;
`;
const Container2 = styled.div`
  img {
    width: 100%;
  }
  .searchbox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: -210px;
    .f {
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        width: 1000px;
        height: 52px;
        border-radius: 10px;
        font-size: 95%;
        padding-left: 30px;
        padding-right: 115px;
        border: none;
      }
      button {
        height: 43px;
        position: relative;
        left: -105px;
        background-color: #49bbbd;
        color: white;
        border: 1px solid white;
        width: 100px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 100%;
        cursor: pointer;
      }
    }
    .s {
      position: relative;
      left: -65px;
      width: 900px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px 0;
      #dropdown {
        padding: 11px 20px;
        border-radius: 8px;
        font-size: 100%;
        font-weight: 600;
        border: none;
      }
    }
  }
`;
