import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Join } from "./components/Join/Join";
import { Chat } from "./components/Chat/Chat";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};
