import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideNavbar from "./SideNavbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import LoadingPopup from "./LoadingPopup";
import { getUserCart, addItemToCart, removeItemFromCart } from "./CartServices";

const CourseViewTemplate = () => {
  const [chapterData, setChapterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [chapterId, setChapterID] = useState(2);
  const { id, chapter } = useParams();
  //   const location = useLocation();
  //   const { id } = location.state;

  const [chapterId, setChapterId] = useState(chapter || 1);
  const [chapterCount, setChapterCount] = useState(0);
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);

  useEffect(() => {
    getUserCart().then((response) => {
      setCart(response.data);
      console.log(response.data);
    });
  }, []);

  const handleAddItem = (courseId, quantity) => {
    if (cart) {
      addItemToCart(cart.id, courseId, quantity)
        .then((response) => {
          const updatedCart = {
            id: response.data.cart_id,
            courseIds: response.data.course_ids,
          };
          setCart(updatedCart);
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
        });
    }
  };

  const handleRemoveItem = (courseId) => {
    removeItemFromCart(1, courseId).then((response) => {
      setCart(response.data);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      console.log("not auth");
    }
  }, []);

  useEffect(() => {
    const fetchCourseChapter = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/dlearn/courses/${id}/${chapterId}/`
        );
        setChapterData(response.data[0]);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/dlearn/courses/${id}/`
        );
        setCourseData(response.data[0]);
        // console.log(response);
        // console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    setLoading(true);
    fetchCourseChapter();
    fetchCourse();
    setLoading(false);
  }, [id, chapterId]);

  useEffect(() => {
    const fetchChapterNo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/dlearn/courses/chapterscount/${id}/`
        );
        setChapterCount(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    setLoading(true);
    fetchChapterNo();
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (chapterId !== chapter) {
      navigate(`/course/${id}/${chapterId}`);
    }
  }, [chapterId, chapter, id, navigate]);

  return (
    <Main>
      <SideNavbar />
      <Container1>
        <Container2>
          <Scrollbars autoHide>
            <h2>Chapters</h2>
            {loading ? (
              <LoadingPopup trigger={loading} setTrigger={setLoading}>
                Loading...
              </LoadingPopup>
            ) : (
              <ul>
                {Array.from(
                  { length: chapterCount?.chapter_count },
                  (_, index) => (
                    <li
                      className={
                        chapterId === index + 1 ? "selected" : "notselected"
                      }
                      key={index + 1}
                      onClick={() => setChapterId(index + 1)}
                    >
                      <p>Chapter : {index + 1}</p>
                    </li>
                  )
                )}
              </ul>
            )}
          </Scrollbars>
        </Container2>
        <Container3>
          <div className="head">
            <div className="lf">
              <h1>{courseData?.topic}</h1>
              <h3>{courseData?.subject}</h3>
            </div>
            <div className="rt">
              <div className="addCartbtn">
                <button onClick={() => handleAddItem(1, 1)} type="submit">
                  Add To Cart
                </button>
              </div>
              <p>ETA: {chapterData?.time_to_complete} hours</p>
            </div>
          </div>
          <div className="chapter-content">
            {loading ? (
              <LoadingPopup trigger={loading} setTrigger={setLoading}>
                Loading...
              </LoadingPopup>
            ) : (
              <ul>
                <h1>{chapterData?.chapter_title}</h1>
                <p>{chapterData?.text_data}</p>
              </ul>
            )}
          </div>
        </Container3>
      </Container1>
    </Main>
  );
};

export default CourseViewTemplate;

const Container3 = styled.div`
  width: 100%;
  overflow-y: auto;
  /* background-color: #e97a7a; */
  .head {
    display: flex;
    justify-content: space-between;
    height: 100px;
    padding: 15px 60px;
    color: white;
    background-color: #49bbbd;
    .lf {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .rt {
      display: flex;
      align-items: end;
      .addCartbtn {
        margin: 10px 3px;
      }
    }
  }
  .chapter-content {
    height: 100%;
    border-left: 1px solid #49bbbd;
    padding: 15px 30px;
    h1 {
      margin: 20px 2px;
    }
    p {
      line-height: 23px;
      font-size: 110%;
    }
  }
`;
const Main = styled.div`
  display: flex;
`;
const Container1 = styled.div`
  margin-left: 5vw;
  width: calc(100vw - 5vw);
  display: flex;
  gap: 40px;
  /* background-color: #b12260; */
  height: 100vh;
`;
const Container2 = styled.div`
  width: 22vw;
  overflow-y: auto;
  padding: 20px 15px;
  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
    z-index: -2;
  }
  ul li {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:nth-child(even) {
      background-color: #fcddb5;
    }
    &:nth-child(odd) {
      background-color: #e2f0ff;
    }
    font-size: 110%;
  }
  h2 {
    padding: 15px 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ul li.selected {
    background-color: #49bbbd;
    color: white;
  }
`;
