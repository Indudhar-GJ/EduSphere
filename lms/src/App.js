import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Mycourses from './components/Mycourses';
import CourseCatalog from './components/CourseCatalog';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import Membership from './components/Membership';
import CourseDetails from './components/CourseDetails';
import Cart from './components/Cart';
import CourseViewTemplate from './components/CourseViewTemplate';
import Temp from './components/Temp';
import Search from './components/Search';

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mycourses" element={<Mycourses />} />
        <Route path="/search" element={<Search />} />
        <Route path="/course/:id" element={<CourseViewTemplate />} />
        <Route path="/course/:id/:chapter" element={<CourseViewTemplate />} />
        {/* <Route path="/course-catalog" element={<CourseCatalog />} /> */}
        <Route path="/pricing" element={<Membership />} />
        <Route path="/course-details/:id" element={<CourseDetails />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/temp" element={<Temp />} /> */}
      </Routes>
    </>
  );
};

export default App;
