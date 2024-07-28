import React from "react";
import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashborad";
import ManagerDashboard from "./components/ManagerDashborad";
import UserDashboard from "./components/UserDashborad";
import PrivateRoute from "./routes/privateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute roles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<PrivateRoute roles={["manager"]} />}>
          <Route path="/manager" element={<ManagerDashboard />} />
        </Route>

        <Route element={<PrivateRoute roles={["user"]} />}>
          <Route path="/user" element={<UserDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
