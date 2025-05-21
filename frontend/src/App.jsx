import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import NoteDetailPage from "./Pages/NoteDetailPage";
import toast from "react-hot-toast";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <div className="" data-theme="abyss" >
      

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
