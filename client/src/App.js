import "./App.css";
import BlogForm from "./components/views/BlogFormPage/BlogForm";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BlogForm />} />
        <Route path="/land" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
