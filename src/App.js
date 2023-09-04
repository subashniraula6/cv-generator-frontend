import "./App.css";
import "antd/dist/reset.css";
import NavBar from "./Components/Common/NavBar";
import PublicRoutes from "./Components/Routes";
import { ConfigProvider } from "antd";
import { StyleProvider } from '@ant-design/cssinjs';


function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "rgb(149, 0, 255, 0.4)",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "rgba(149, 0, 255, 0.09)",
        },
        components: {
          Dropdown: {
            colorBgElevated: "rgb(149, 0, 255)",
          },
          Table: {
            colorBgContainer: "rgb(149, 0, 255, 0.01)",
          },
        }
      }}
    >
        <NavBar />
        <PublicRoutes />
    </ConfigProvider>
  );
}

export default App;
