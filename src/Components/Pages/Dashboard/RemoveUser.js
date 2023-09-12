import React, { useEffect, useState } from "react";
import DataTable from "./dataTable";
import "./AddQuestion.css";
import FormDrawer from "./formDrawer";
import { Button, Popconfirm, Typography, notification } from "antd";
import { useFormHandler } from "./formHook";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import importedQuestions from "../../../Questions";
import { useLanguage } from "../../../context/Language";
import { toSentenceCase, toCamelCase } from "../../../utils";
import axios from "../../../axios/axios";
import { useFirebase } from "../../../context/Firebase";
import ProgressBar from "../../Common/ProgressBar/ProgressBar";

const { Title } = Typography;

const dtConfig = [
  {
    title: "index",
    dataIndex: "id",
    textFilter: true,
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: "Name",
    dataIndex: "name",
    textFilter: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    textFilter: true,
  },
  // {
  //   title: "Image",
  //   dataIndex: "image",
  //   textFilter: true,
  // },
];

const apiService = { props: {} };
const title = "Users";
const roleLevel = "props";
const RemoveUser = (props) => {
  let [fetchPogress, setFetchProgress] = useState(null);
  let [renderCount, setRenderCount] = useState(0)
  // Data
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  const { user } = useFirebase(); 
  useEffect(() => {
    // Fetch users and set Users
    axios
      .get("kneg/users", {
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setFetchProgress(percentCompleted);
        },
      })
      .then(({ data }) => {
        let users = data.data.map(u => ({
          id: u.id,
          email: u.email,
          name: (u.fname || "") + " " + (u.lname || ""),
          uid: u.uid
        }));
        setUsers(users);
      })
      .catch((err) => {
        notification.error({
          message: "Fetching questions error",
          description: err.message,
        });
        console.log(err);
      });
  }, [renderCount]);

  useEffect(() => {
    setItems(users.map((user) => user));
  }, [users]);

  const handleItemDelete = (uid) => {
    axios.post("delete_user", JSON.stringify({
      u_id: uid,
    }))
    .then(res => {
      setRenderCount(renderCount + 1)
    })
    .catch((err) => {
      notification.error({
        message: "Delete user error",
        description: err.message,
      });
    });
  };

  useEffect(() => {
    if (roleLevel === "role admin") {
      //    dispatch(datatableActions.getAll(apiService));
    } else if (roleLevel === "role manager") {
      //    dispatch(datatableActions.getByGroupId(apiService, localStorage.getItem('groupId')));
    } else {
      //    dispatch(datatableActions.getByUserId(apiService, localStorage.getItem('userId')));
    }
  }, []);

  const handleTableChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  const dtConfigColumns = [
    ...dtConfig,
    {
      title: "Actions",
      dataIndex: "Actions",
      align: "center",
      render: (text, record) => {
        return (
          <Button.Group>
            <Popconfirm
              title="Sure to Delete?"
              onConfirm={() => handleItemDelete(record.uid)}
            >
              <Button
                type="danger"
                shape="circle"
                icon={<DeleteOutlined />}
                size="large"
              />
            </Popconfirm>
          </Button.Group>
        );
      },
    },
  ];

  if (fetchPogress >= 0 && fetchPogress < 100)
    return <ProgressBar progress={fetchPogress} />;
  return (
    <div className="table-container">
      <Title level={3}>{title}</Title>
      <DataTable
        items={items}
        dtConfigColumns={dtConfigColumns}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default RemoveUser;
