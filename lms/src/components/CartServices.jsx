// src/services/cartService.js
import axios from "axios";

const API_URL = "http://localhost:8000/dlearn/carts/";
axios.defaults.baseURL = "http://localhost:8000/dlearn/";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "access_token"
)}`;

const getCart = (cartId) => {
  return axios.get(`${API_URL}${cartId}/`);
};

const addItemToCart = (cartId, courseId, quantity) => {
  return axios.post(`${API_URL}${cartId}/add_item/`, {
    course_id: courseId,
    quantity: quantity,
  });
};

const removeItemFromCart = (cartId, courseId) => {
  return axios.post(`${API_URL}${cartId}/remove_item/`, {
    course_id: courseId,
  });
};

const getUserCart = () => {
  return axios.get("cart/");
};

export { getCart, addItemToCart, removeItemFromCart, getUserCart };
