import React from "react";
import {
  Dropdown,
  Typography,
  Avatar,
} from "antd";
import {
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";

const routes = [
  {
    path: "index",
    breadcrumbName: "First-level Menu",
  },
];

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Add Question
        <PlusOutlined style={{margin: "0 10px"}}/>
      </a>
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
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
        <Avatar style={{ backgroundColor: '#87d068' }} size={35} icon={<UserOutlined />}/>
    </a>
  </Dropdown>
);

const NavBar = () => (
  <PageHeader
    title="KNEGG"
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
