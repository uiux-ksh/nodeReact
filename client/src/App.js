import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Footer from "./page/Footer";
import LandingPage from "./page/LandingPage";
import LoginPage from "./page/LoginPage";
import NavBar from "./page/NavBar";
import Home from "./page/Home";
import RegisterPage from "./page/RegisterPage";
import Auth from "./hoc/auth";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={Auth(Home,true)}></Route>
        <Route path="/footer" element={<Footer />} />
        <Route path="/Landing" element={Auth(LandingPage,null )} />
        <Route path="/Login" element={Auth(LoginPage,false)} />
        <Route path="/register" element={Auth(RegisterPage,false)} />
      </Routes>
    </Router>
  );
}

export default App;
