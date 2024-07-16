import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideNavbar from "./SideNavbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import LoadingPopup from "./LoadingPopup";
import { getUserCart, addItemToCart, removeItemFromCart } from "./CartServices";

const CourseViewTemplate = () => {
  const [chapterData, setChapterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id, chapter } = useParams();
  const [chapterId, setChapterId] = useState(chapter || 1);
  const [chapterCount, setChapterCount] = useState(0);
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [boughtCourses, setBoughtCourses] = useState([]);
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getUserCart();
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    };
    fetchCart();
  }, []);

  const handleAddItem = async (courseId, quantity) => {
    try {
      if (cart) {
        const response = await addItemToCart(cart.id, courseId, quantity);
        const updatedCart = {
          id: response.data.cart_id,
          courseIds: response.data.course_ids,
        };
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemoveItem = async (courseId) => {
    try {
      const response = await removeItemFromCart(cart.id, courseId);
      setCart(response.data);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const [courseResponse, chapterResponse, chapterCountResponse] =
          await Promise.all([
            axios.get(`http://localhost:8000/dlearn/courses/${id}/`),
            axios.get(
              `http://localhost:8000/dlearn/courses/${id}/${chapterId}/`
            ),
            axios.get(
              `http://localhost:8000/dlearn/courses/chapterscount/${id}/`
            ),
          ]);

        setCourseData(courseResponse.data[0]);
        setChapterData(chapterResponse.data[0]);
        setChapterCount(chapterCountResponse.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchCourseData();
  }, [id, chapterId]);

  useEffect(() => {
    const fetchBoughtCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/dlearn/bought_courses/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setBoughtCourses(response.data);
      } catch (error) {
        console.error("Error fetching bought courses:", error);
      }
    };

    fetchBoughtCourses();
  }, []);

  useEffect(() => {
    try {
      for (let i = 0; i < boughtCourses.length; i++) {
        if (boughtCourses[i].id == id) {
          setLocked(false);
        }
      }
    } catch {
      setLocked(true);
    }
  }, [boughtCourses, id]);

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
            {!locked && loading ? (
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
                <button
                  onClick={() => handleAddItem(courseData.id, 1)}
                  type="submit"
                >
                  Add To Cart
                </button>
                <Link to="/cart">Go To Cart</Link>
              </div>
              <p>ETA: {chapterData?.time_to_complete} hours</p>
            </div>
          </div>
          <div className={locked ? "locked-content" : "chapter-content"}>
            {loading ? (
              <LoadingPopup trigger={loading} setTrigger={setLoading}>
                Loading...
              </LoadingPopup>
            ) : locked ? (
              <>
                <LoadingPopup trigger={locked} setTrigger={setLocked}>
                  <Link
                    onClick={() => handleAddItem(courseData.id, 1)}
                    to="/cart"
                  >
                    Buy This course to View
                  </Link>
                </LoadingPopup>
              </>
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
  .locked-content {
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
    background-image: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0)
    );
    box-shadow: 10px 10px 10px rgba(30, 30, 30, 0.5);
    backdrop-filter: blur(10px);
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
