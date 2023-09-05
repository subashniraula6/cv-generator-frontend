import "./App.css";
import "antd/dist/reset.css";
import NavBar from "./Components/Common/NavBar";
import PublicRoutes from "./Components/Routes";
import CookieConsentBanner from "./Components/CookieConsentBanner";

function App() {
  return (
    <>
      <NavBar />
      <PublicRoutes/>
      <CookieConsentBanner/>
    </>
  );
}

export default App;
