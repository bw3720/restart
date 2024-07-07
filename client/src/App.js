import "./App.css";
import BlogForm from "./BlogForm";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";

import LandingPage from "./components/views/LandingPage/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/register" element={<BlogForm />} />
      </Routes>
    </Router>
  );
}

export default App;
