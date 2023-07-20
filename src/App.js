import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Views from "Views";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Views />} />
      </Routes>
    </Router>
  );
}

export default App;
