import React from "react";
import { Menu, Dropdown, Button, Tag, Typography, Row } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { PageHeader } from '@ant-design/pro-layout';

const { Paragraph } = Typography;

const routes = [
  {
    path: "index",
    breadcrumbName: "First-level Menu"
  },
  {
    path: "first",
    breadcrumbName: "Second-level Menu"
  },
  {
    path: "second",
    breadcrumbName: "Third-level Menu"
  }
];

const menu = (
  <Menu mode="horizontal">
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const DropdownMenu = () => (
  <Dropdown key="more" overlay={menu}>
    <Button
      style={{
        border: "none",
        padding: 0
      }}
    >
      <EllipsisOutlined
        style={{
          fontSize: 20,
          verticalAlign: "top"
        }}
      />
    </Button>
  </Dropdown>
);

const NavBar = () => (
  <PageHeader
    title="KNEGG"
    className="site-page-header"
    subTitle="An AI generated CV/Cover letter"
    // tags={<Tag color="blue">Running</Tag>}
    extra={[
      menu,
      <DropdownMenu key="more" />
    ]}
    avatar={{
      src: 'logo-kneg.png'
    }}
    breadcrumb={{ routes }}
  ></PageHeader>
);

export default NavBar;