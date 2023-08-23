import "./App.css";
import "antd/dist/reset.css";
import NavBar from "./Components/Common/NavBar";
import PublicRoutes from "./Components/Routes";

function App() {
  return (
    <>
      <NavBar />
      <PublicRoutes/>
    </>
  );
}

export default App;
