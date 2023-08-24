import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Login from "./Login/Login";
import ForgotPassword from "./Login/ForgotPassword";
import Signup from "./Login/Signup";
import AppPage from "./Pages/App";
import Homepage from './home/Homepage'
import Dashboard from "./Pages/Dashboard/Dashboard";

import { useFirebase } from "../context/Firebase";

const RestrictedRoute = ({children}) => {
  let { user } = useFirebase();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/homepage" element={<Homepage/>} />
      <Route
        path="/app"
        element={
          <RestrictedRoute>
            <AppPage />
          </RestrictedRoute>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <RestrictedRoute>
            <Dashboard />
          </RestrictedRoute>
        }
      />
    </Routes>
  );
};

export default PublicRoutes;
