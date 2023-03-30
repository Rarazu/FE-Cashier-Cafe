import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css"
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Makanan from "./pages/Makanan";
import Minuman from "./pages/Minuman";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import User from "./pages/User";
import Transaksi from "./pages/Transaksi";
import AddTransaksi from "./pages/AddTransaksi";
import Meja from "./pages/Meja";


export default function App() {
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Navbar /> <Home /> </>} />
          <Route path="/menu" element={<><Navbar /> <Menu /> </>} />
          <Route path="/menu/food" element={<><Navbar /><Makanan /></>} />
          <Route path="/menu/drink" element={<><Navbar /><Minuman /></>} />
          <Route path="/signin" element={<Login />} />
          <Route path="/user" element={<><Navbar /> <User /></>} />
          <Route path="/table" element={<><Navbar /><Meja /></>} />
          <Route path="/order" element={<><Navbar /><Transaksi /></>} />
          <Route path="/order/add" element={<><Navbar /><AddTransaksi /></>} />
        </Routes>
    </BrowserRouter>
  )
}