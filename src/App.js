import "./App.css";
import "antd/dist/reset.css";
import NavBar from "./Components/Common/NavBar";
import { Route, Routes } from "react-router-dom";
import AppPage from "./Components/Pages/App";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path='/'></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route> */}
        <Route path="dashboard/*" element={<Dashboard />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </>
  );
}

export default App;
