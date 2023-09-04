import React from "react";
import { Dropdown, Avatar } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import { Link } from "react-router-dom";
import { useFirebase } from "../../../context/Firebase";
import { useLanguage } from "../../../context/Language";
import { useNavigate } from "react-router-dom";
import LanguageSelect from "./LanguageSelect";
import { useLocation } from "react-router-dom"

const routes = [
  {
    path: "index",
    breadcrumbName: "First-level Menu",
  },
];

let navBarStyle = {
  backgroundColor: "#EEEEE !important",
};

function handleLogout(logout) {
  try {
    logout();
    // navigate("/login");
  } catch (e) {
    console.log(e.message);
  }
}

const getItems = (logout, t) => [
  {
    key: "1",
    label: (
      <Link to="/dashboard">
        {t("menu.dashboard")}
        <DashboardOutlined style={{ margin: "0 10px" }} />
      </Link>
    ),
  },
  {
    key: "2",
    danger: true,
    label: (
      <a onClick={(e) => handleLogout(logout)}>
        {t("menu.logout")}
        <LogoutOutlined style={{ margin: "0 10px" }} />
      </a>
    ),
  },
];

const DropdownMenu = () => {
  let { logout, user } = useFirebase();
  let { t } = useLanguage();

  return (
    <Dropdown
      menu={{
        items: getItems(logout, t),
      }}
    >
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          size={35}
          icon={<UserOutlined />}
        />
    </Dropdown>
  );
};

const NavBar = () => {
  const {pathname: location} = useLocation();
  let { t } = useLanguage();
  let { user } = useFirebase();
  let navigate = useNavigate();
  if(location === "/") return null;
  return (
    <PageHeader
      title="KNEG"
      className="site-page-header"
      subTitle={t("app.intro")}
      extra={[<LanguageSelect />, user ? <DropdownMenu key="more" /> : null]}
      avatar={{
        src: "logo-kneg.png",
        onClick: () => {
          navigate("/app");
        },
      }}
      breadcrumb={{ routes }}
      style={navBarStyle}
    />
  );
};

export default NavBar;
