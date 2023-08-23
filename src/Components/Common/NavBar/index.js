import React from "react";
import { Dropdown, Avatar } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import { Link } from "react-router-dom";
import { useFirebase } from "../../../context/Firebase";
import { useNavigate } from "react-router-dom";

const routes = [
  {
    path: "index",
    breadcrumbName: "First-level Menu",
  },
];

let navBarStyle = {
  backgroundColor: "#EEEEE !important",
};

function handleLogout(logout, navigate) {
  try {
    logout();
    // navigate("/login");
  } catch (e) {
    console.log(e.message);
  }
}

const getItems = (logout, navigate) => [
  {
    key: "1",
    label: (
      <Link to="/dashboard">
        Dashboard
        <DashboardOutlined style={{ margin: "0 10px" }} />
      </Link>
    ),
  },
  {
    key: "2",
    danger: true,
    label: (
      <a onClick={(e) => handleLogout(logout, navigate)}>
        Logout
        <LogoutOutlined style={{ margin: "0 10px" }} />
      </a>
    ),
  },
];

const DropdownMenu = ({logout, navigate}) => (
  <Dropdown
    menu={{
      items: getItems(logout, navigate),
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

const NavBar = () => {
  let { logout, user } = useFirebase();
  let navigate = useNavigate();
  if(!user) {
    return null;
  }
  return (
    <PageHeader
      title="KNEG"
      className="site-page-header"
      subTitle="An AI generated CV/Cover letter"
      extra={[
        // menu,
        <DropdownMenu key="more" logout={logout} navigate={navigate} />,
      ]}
      avatar={{
        src: "logo-kneg.png",
      }}
      breadcrumb={{ routes }}
      style={navBarStyle}
    />
  );
};

export default NavBar;
