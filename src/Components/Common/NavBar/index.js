import React from "react";
import {
  Dropdown,
  Avatar,
} from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import { Link } from 'react-router-dom'

const routes = [
  {
    path: "index",
    breadcrumbName: "First-level Menu",
  },
];

const getItems = () => [
  {
    key: "1",
    label: (
      <Link to="/dashboard">
        Dashboard
        <DashboardOutlined style={{margin: "0 10px"}}/>
      </Link>
    ),
  },
  {
    key: "2",
    danger: true,
    label: (
      <>
        <a>Logout</a>
        <LogoutOutlined style={{margin: "0 10px"}} />
      </>
    ),
  },
];

const DropdownMenu = () => (
  <Dropdown
    menu={{
      items: getItems(),
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
        <Avatar style={{ backgroundColor: '#87d068' }} size={35} icon={<UserOutlined />}/>
    </a>
  </Dropdown>
);

const NavBar = () => (
  <PageHeader
    title="KNEG"
    className="site-page-header"
    subTitle="An AI generated CV/Cover letter"
    extra={[
      // menu,
      <DropdownMenu key="more" />,
    ]}
    avatar={{
      src: "logo-kneg.png",
    }}
    breadcrumb={{ routes }}
  ></PageHeader>
);

export default NavBar;
