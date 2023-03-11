import React, { useState } from 'react'
import { Home, Signin, Signup } from './components';
import { Routes, Route, Navigate } from "react-router-dom";

const getLocalStorageData = () => {
  let userLS = localStorage.getItem("user");
  if (userLS) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return null;
  }
}

function App() {

  const [user, setUser] = useState(getLocalStorageData);
  // console.log("user :", user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home getLocalStorageData={getLocalStorageData} user={user} setUser={setUser} />} />
        <Route path="/signup" element={
          user === null ? <Signup /> : <Navigate to="/" />
        } />
        <Route path="/signin" element={
          user === null ? <Signin /> : <Navigate to="/" />
        } />
      </Routes>
    </>
  )
}

export default App
