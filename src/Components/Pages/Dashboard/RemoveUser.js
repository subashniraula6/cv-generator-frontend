import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Popconfirm,
  Drawer,
  Select,
  Spin,
  Tag,
} from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import { Option } from "antd/es/mentions";
import { useFirebase } from "../../../context/Firebase";

const UserTable = () => {
  // State for table data, pagination, sorting, and filtering
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortedInfo, setSortedInfo] = useState({});
  let { user } = useFirebase();

  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [userRoles, setUserRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [defaultRole, setDefaultRole] = useState(null);
  const [saveRoleLoading, setSaveRoleLoading] = useState(false);

  // State for API request parameters
  const [apiParams, setApiParams] = useState({
    page: 1,
    per_page: 10,
    sort_by: "id",
    sort_order: "asc",
    search_term: "",
  });

  // Fetch data from your backend API when the component mounts
  useEffect(() => {
    fetchData();
  }, [apiParams]);

  // Fetch data from your backend API
  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await Axios.get("http://localhost:5000/kneg/users", {
        params: apiParams,
      });

      // Assuming the API response returns data and pagination information
      setData(response.data.data);
      setPagination({
        ...pagination,
        total: response.data.total_records,
      });
    } catch (error) {
      // Handle errors here
      console.error(error);
    }

    setLoading(false);
  };

  // Handle pagination change
  const handleTableChange = (newPagination, filters, sorter) => {
    setApiParams({
      ...apiParams,
      page: newPagination.current,
      per_page: newPagination.pageSize,
    });
    setSortedInfo(sorter);
  };

  // Handle search input
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setApiParams({
      ...apiParams,
      search_term: selectedKeys[0],
      page: 1, // Reset to the first page when searching
    });
  };

  // Reset search filter
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    setApiParams({
      ...apiParams,
      search_term: "",
      page: 1, // Reset to the first page when clearing search
    });
  };

  // Apply filters based on search text
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
  });

  const handleShowRolesDrawer = async (user) => {
    setSelectedUser(user);
    setDrawerVisible(true);

    try {
      const userRolesResponse = await Axios.get(
        `http://localhost:5000/kneg/user-role/${user.role_id}`
      );

      const allRolesResponse = await Axios.get(
        "http://localhost:5000/kneg/user-roles"
      );

      setDefaultRole(userRolesResponse.data.data.id);
      setSelectedRole(userRolesResponse.data.data.id);

      // Add other roles to the default roles if needed
      const otherRoles = allRolesResponse.data.data.filter(
        (role) => role.id !== userRolesResponse.data.data.id
      );

      setUserRoles(
        [...otherRoles, userRolesResponse.data.data].filter(
          (role) => role.role_name.toLowerCase() !== "superadmin"
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleHideRolesDrawer = () => {
    setSelectedUser(null);
    setDrawerVisible(false);
    setUserRoles([]);
    setSelectedRole(null);
    setDefaultRole(null);
  };

  const handleSelectRole = (roleId) => {
    setSelectedRole(roleId);
  };

  const checkAction = (userRole, recordRole) => {
    let user_role_lower = userRole.toLowerCase();
    let record_role_lower = recordRole.toLowerCase();
    if (record_role_lower === "user") return true;
    if (record_role_lower == "admin") {
      if (user_role_lower == "superadmin") {
        return true;
      }
    }
    return false;
  };

  const handleDeleteUser = async (userId) => {
    try {
      await Axios.post("http://localhost:5000/delete_user", {
        user_id: userId,
      });

      // After successful deletion, fetch the updated user data
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveRole = async () => {
    try {
      setSaveRoleLoading(true);
      await Axios.put(
        `http://localhost:5000/kneg/user-roles/${selectedUser.id}`,
        {
          role_id: selectedRole,
        }
      );
      setSaveRoleLoading(false);

      // After successful role addition, fetch the updated user data
      fetchData();

      // Close the drawer
      handleHideRolesDrawer();
    } catch (error) {
      setSaveRoleLoading(false);
      console.error(error);
    }
  };

  // Columns configuration
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"), // Enable searching for this column
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => {
        return (
          <Tag
            color={text == "Admin" ? "red" : "blue"}
            icon={<CheckCircleOutlined />}
          >
            {text}
          </Tag>
        );
      },
      ...getColumnSearchProps("role"), // Enable searching for this column
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <span>
          {checkAction(user.user_role, record.role) && (
            <>
              <Popconfirm
                title="Are you sure you want to delete this user?"
                onConfirm={() => handleDeleteUser(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="danger"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  size="large"
                />
              </Popconfirm>
              <Button
                type="danger"
                shape="circle"
                icon={<UserAddOutlined />}
                size="large"
                onClick={() => handleShowRolesDrawer(record)}
              />
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />

      <Drawer
        title={`Add Roles for ${selectedUser ? selectedUser.email : ""}`}
        width={400}
        onClose={handleHideRolesDrawer}
        visible={drawerVisible}
      >
        <Spin spinning={!defaultRole}>
          <Select
            placeholder="Select a role"
            onChange={handleSelectRole}
            style={{ width: "100%" }}
            defaultValue={defaultRole}
            value={selectedRole}
          >
            {userRoles.map((userRole) => (
              <Option key={userRole?.id} value={userRole?.id}>
                {userRole?.role_name}
              </Option>
            ))}
          </Select>
        </Spin>
        <Spin spinning={saveRoleLoading}>
          <Button
            type="primary"
            onClick={handleSaveRole}
            style={{ marginTop: "10px" }}
            disabled={selectedRole == defaultRole}
          >
            Save Role
          </Button>
        </Spin>
      </Drawer>
    </div>
  );
};

export default UserTable;
