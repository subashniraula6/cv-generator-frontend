import React from "react";
import { Dropdown, Avatar, Button } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import { Link } from "react-router-dom";
import { useFirebase } from "../../../context/Firebase";
import { useLanguage } from "../../../context/Language";
import { useNavigate,useLocation } from "react-router-dom";
import LanguageSelect from "./LanguageSelect";

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
      <a>
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          size={35}
          icon={<UserOutlined />}
        />
      </a>
    </Dropdown>
  );
};

const NavBar = () => {
  let { t } = useLanguage();
  let { user } = useFirebase();
  let navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/homepage";
  return (
    !isHomePage && (
      <PageHeader
        title="KNEG"
        className="site-page-header"
        subTitle={t("app.intro")}
        extra={[
          <LanguageSelect />,
          user ? <DropdownMenu key="more" /> : null,
        ]}
        avatar={{
          src: "logo-kneg.png",
        }}
        breadcrumb={{ routes }}
        style={navBarStyle}
      />
    )
  );
};

export default NavBar;
