import { BrowserRouter, Routes, Route, useLocation, } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Budget from "./pages/Budget";


export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation(); // Get the current route

  return (
    <div className="flex">
     
{(location.pathname === "/dashboard" || location.pathname === "/budget" ) && <Sidebar />}


      <div className="flex-1">
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />

        </Routes>
      </div>
    </div>
  );
}
