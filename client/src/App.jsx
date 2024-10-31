import { GuestHeader } from "./components/GuestHeader";
import { GuestHome } from "./components/GuestHome";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import Sidebar from "./components/SideBar";
import { Signup } from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/guestheader" element={<GuestHeader />} />
          <Route path="/guesthome" element={<GuestHome />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
