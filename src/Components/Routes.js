import React, { useEffect, useState } from "react";
import { Route, Navigate, Routes, Outlet } from "react-router-dom";
import Login from "./Login/Login";
import ForgotPassword from "./Login/ForgotPassword";
import Signup from "./Login/Signup";
import AppPage from "./Pages/App";
import Dashboard from "./Pages/Dashboard/Dashboard";
// import Homepage from "./Pages/home/Homepage"
import { useFirebase } from "../context/Firebase";
import PrivacyPolicy from "./PrivacyPolicy";
import Background from "./Common/Background/Background";
import { Spin } from "antd";

const RestrictedRoute = ({ children }) => {
  let { user } = useFirebase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated or not.
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    // Display a loading indicator while the authentication status is being determined.
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

const PublicRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Background>
            <Outlet />
          </Background>
        }
      >
        <Route index element={<Navigate to="/login" />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="privacyandpolicy" element={<PrivacyPolicy />} />
      <Route
        path="app"
        element={
          <RestrictedRoute>
            <AppPage />
          </RestrictedRoute>
        }
      />
      <Route
        path="dashboard/*"
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
