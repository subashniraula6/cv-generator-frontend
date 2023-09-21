import "./App.css";
import "antd/dist/reset.css";
import NavBar from "./Components/Common/NavBar";
import PublicRoutes from "./Components/Routes";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import CookieConsentBanner from "./Components/CookieConsentBanner";
import Background from "./Components/Common/Background/Background";

function App() {
  let appTheme = {
    border: '1px solid red',
    token: {
      // Seed Token
      colorPrimary: "rgb(149, 0, 255, 0.4)",
      borderRadius: 2,

      // Alias Token
      colorBgContainer: "rgba(149, 0, 255, 0.09)",
    },
    components: {
      Select: {
        borderRadiusOuter: "4px",
      },
      
    },
  };

  return (
    <ConfigProvider theme={appTheme}>
      <NavBar />
        <PublicRoutes />
      <CookieConsentBanner />
    </ConfigProvider>
  );
}

export default App;
