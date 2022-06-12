import React from "react";
import Login from "./Pages/Login";
import Menubar from "./Components/Menubar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Menubar />
        <Routes>
          <Route exact path="/productlist" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
