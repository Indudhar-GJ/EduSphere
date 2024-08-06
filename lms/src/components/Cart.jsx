import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SideNavbar from "./SideNavbar";
import Course from "./Course";
import Popup from "./Popup";
import { getUserCart, addItemToCart, removeItemFromCart } from "./CartServices";
import axios from "axios";

const options = [
  { value: "Option 1", label: "Option 1" },
  { value: "Option 2", label: "Option 2" },
  { value: "Option 3", label: "Option 3" },
];

const Cart = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [cart, setCart] = useState([]);
  const [giftPopup, setGiftPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [totalDiscountValue, setDiscountValue] = useState(15);
  const [totalNetValue, setTotalNetValue] = useState(0);
  const [cartId, setCartId] = useState(0);
  const [delItmeId, setDelItemId] = useState(-1);

  useEffect(() => {
    getUserCart().then((response) => {
      setCart(response.data.items);
      setCartId(response.data.id);
    });
  }, []);

  useEffect(() => {
    try {
      setTotalCartValue(0);
      for (let i = 0; i < cart.length; i++) {
        setTotalCartValue((prev) => prev + cart[i].course.price);
      }
    } catch {
      setTotalCartValue(0);
    }
    getUserCart().then((response) => {
      setCart(response.data.items);
      setCartId(response.data.id);
    });
  }, [cart]);

  const handleAddItem = (courseId, quantity) => {
    addItemToCart(cartId, courseId, quantity).then((response) => {
      setCart(response.data.items);
    });
  };

  const handleRemoveItem = (courseId) => {
    removeItemFromCart(cartId, courseId).then((response) => {
      setCart(response.data.items);
    });
  };

  const handlePurchase = () => {
    axios
      .post(`http://localhost:8000/dlearn/carts/${cartId}/purchase_items/`)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error purchasing items:", error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      console.log("not auth");
    }
  }, []);

  return (
    <MainContainer>
      <SideNavbar />
      <Container1>
        <Container2>
          <h1>Cart</h1>
          {cart?.length && (
            <p>
              <span style={{ fontWeight: 800 }}>{cart?.length || 0} items</span>
              in your cart
            </p>
          )}
          <Container4>
            {cart?.length > 0 && (
              <Container $cartItems={cart?.length || 0}>
                <Table>
                  <Thead>
                    <tr>
                      <Th>S.no</Th>
                      <Th>Product</Th>
                      <Th>Price</Th>
                      <Th>Rating</Th>
                      <Th>Gift/Delete</Th>
                    </tr>
                  </Thead>
                  <Tbody>
                    {cart.map((item, index) => (
                      <Tr key={item.id}>
                        <Td>{index + 1}</Td>
                        <Td>
                          <div className="cartimg">
                            <Course
                              id={item.course.id}
                              subject={item.course.subject}
                              content={item.course.topic}
                              teacher={item.course.teacher.first_name}
                              chapters={item.course.no_of_chapters}
                            />
                          </div>
                        </Td>
                        <Td>&#8377; {item.course.price}</Td>
                        <Td>{item.course.rating}</Td>
                        <Td className="tabbtn">
                          <button
                            type="button"
                            className="gift"
                            onClick={() => setGiftPopup(true)}
                          >
                            Gift
                          </button>
                          <button
                            type="button"
                            className="del"
                            onClick={() => {
                              setDeletePopup(true);
                              setDelItemId(item.course.id);
                            }}
                          >
                            Remove
                          </button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Container>
            )}
            <Container3>
              <h2>Calculated Shipping</h2>
              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Container5>
                <h3>Cart Total</h3>
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Total</span>
                    <span>{totalCartValue}</span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Discount</span>
                    <span>{totalDiscountValue}%</span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Cart total</span>
                    <span>
                      {Math.floor(
                        totalCartValue -
                          (totalCartValue * totalDiscountValue) / 100
                      )}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => {
                      handlePurchase();
                    }}
                    type="submit"
                  >
                    Pay Now
                  </button>
                </div>
              </Container5>
            </Container3>
          </Container4>
        </Container2>
      </Container1>
      <Popup trigger={giftPopup} setTrigger={setGiftPopup}>
        <ContainerPopUp className="popup-content">
          <h2>Gift Card</h2>
          <p>E-Mail : </p>
          <input type="text" placeholder="Enter Mail Id" />
          <p>Message : </p>
          <textarea placeholder="Enter Message" cols={65} rows={5}></textarea>
        </ContainerPopUp>
      </Popup>
      <Popup trigger={deletePopup} setTrigger={setDeletePopup}>
        <ContainerDelPop>
          <h2>Are you sure you want to delete this course?</h2>
          <div className="delpopbtn">
            <button type="button" onClick={() => setDeletePopup(false)}>
              No
            </button>
            <button
              type="button"
              onClick={() => {
                setDeletePopup(false);
                handleRemoveItem(delItmeId);
              }}
            >
              Yes
            </button>
          </div>
        </ContainerDelPop>
      </Popup>
    </MainContainer>
  );
};

export default Cart;

const ContainerDelPop = styled.div`
  .delpopbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    button {
      margin-top: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 35px;
      border-radius: 10px;
      background-color: transparent;
      cursor: pointer;
    }
  }
  h2 {
    text-align: center;
  }
`;

const ContainerPopUp = styled.div`
  h2 {
    text-align: center;
    font-size: 250%;
    color: #000000;
  }
  p {
    font-size: 115%;
    font-weight: 600;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  input,
  textarea {
    padding: 8px 18px;
    border-radius: 10px;
    border: 2px solid black;
    background-color: transparent;
  }
`;

const Container5 = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
  background-color: #ffc870;
  padding: 20px 20px;
  border-radius: 10px;
  margin: 35px 5px;
  button {
    padding: 8px 55px;
    background-color: #fff;
    border-radius: 17px;
    font-weight: 800;
    font-size: 80%;
    cursor: pointer;
  }
  div {
    margin: 4px 0;
  }
`;

const Container3 = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  width: 300px;
  position: absolute;
  right: 40px;
`;

const Container4 = styled.div`
  display: flex;
  gap: 30px;
`;

const Container2 = styled.div`
  padding: 50px 30px;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  background-color: #e6f3fd;
`;

const Container1 = styled.div`
  margin-left: 100px;
  font-size: 115%;
  width: 100vw;
  display: flex;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  width: 70%;
  margin-left: auto;
  margin-right: 400px;
  background-color: ${(props) =>
    props.$cartItems > 0 ? "#fff" : "transparent"};
  padding: 25px 10px;
  border-radius: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  margin-bottom: 45px;
`;

const Th = styled.th`
  padding: 10px;
`;

const Tbody = styled.tbody`
  .tabbtn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    max-width: 150px;
    gap: 15px;
    button {
      padding: 10px 15px;
      border: black;
      border-radius: 8px;
      color: white;
      font-size: 95%;
      cursor: pointer;
    }
    .gift {
      background-color: #12cb75;
    }
    .del {
      background-color: #ff3737;
    }
  }

  .cartimg > * {
    height: 50%;
    width: 100%;
  }
`;

const Tr = styled.tr`
  border-bottom: 1px solid #b0b0b0;
  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: 10px;
  text-align: center;
`;
