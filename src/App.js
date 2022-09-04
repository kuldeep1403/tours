import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Account from "./components/Account";
import AllTours from "./components/AllTours";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Error from "./components/Error";
import Features from "./components/Feature";
import Home from "./components/Home";
import MainFooter from "./components/MainFooter";
import MainNavigation from "./components/MainNavigation";
import SectionTours from "./components/SectionTours";
import TourDetail from "./components/TourDetail";

function App() {
  return (
    <div className="App">
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/yourbenfits" element={<Features />}></Route>
        <Route path="/populartours" element={<SectionTours />}></Route>
        <Route path="/tours" element={<AllTours />}></Route>
        <Route path="/tours/:Id" element={<TourDetail />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/me" element={<Account />}></Route>
      </Routes>
      <MainFooter />
    </div>
  );
}

export default App;
