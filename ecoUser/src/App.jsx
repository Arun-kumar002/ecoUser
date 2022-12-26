import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/auth/Login";
import Adduser from "./components/admin/Adduser";
import Home from "./components/landing/Home";
import Navbar from "./components/navbar/Navbar";
import Notfound from "./components/notfound/Notfound";
import AdminDashboard from "./components/admin/AdminDashboard";
import Newuser from "./components/user/Newuser";
import Updateuser from "./components/admin/UpdateUser";
import DeleteUser from "./components/admin/DeleteUser";

import SocketProvider from "./context/socket";
import Chat from "./components/messenger/Chat";
import AdminProvider from "./context/AdminContext";
import Chat1 from "./components/messenger/Chat1";

const App = () => {
  return (
    <>
      <SocketProvider>
        <AdminProvider>
        <ToastContainer theme="dark" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/register" element={<Adduser />} />
          <Route path="/admin/updateuser" element={<Updateuser />} />
          <Route path="/admin/deleteuser" element={<DeleteUser />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/newuser" element={<Newuser />} />
          <Route path="/user/chat" element={<Chat />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        </AdminProvider>
      </SocketProvider>
    </>
  );
};

export default App;
