import React, { useEffect, useState } from "react";
import DataTable from "./dataTable";
import "./AddQuestion.css";
import FormDrawer from "./formDrawer";
import { Button as AntButton, Popconfirm, Typography, notification } from "antd";
import { Button } from "../../Common/Button";
import { useFormHandler } from "./formHook";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "../../../axios/axios"

const { Title } = Typography;

const dtConfig = [
  {
    title: "index",
    dataIndex: "index",
    textFilter: true,
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: "Name",
    dataIndex: "name",
    textFilter: true,
  },
  {
    title: "Abbreviation",
    dataIndex: "abbr",
    textFilter: true,
  },
];

const apiService = { props: {} };
const title = "Languages";
const roleLevel = "props";
const Languages = (props) => {
  let [renderCount, setRenderCount] = useState(0)
  // Data
  const [languages, setLanguages] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch Languages and setLanguages
    axios
      .get("kneg/languages")
      .then(({ data }) => {
        let languages = data.data.map((l) => ({
          index: l.id,
          name: l.language_full,
          abbr: l.lang_abb,
        }));
        setLanguages(languages);
      })
      .catch((err) => {
        notification.error({
          message: "Fetching languages error",
          description: err.message,
        });
        console.log(err);
      });
  }, [renderCount]);

  useEffect(() => {
    setItems(languages);
  }, [languages]);

  // Config
  const [formConfig, setFormConfig] = useState({});
  useEffect(() => {
    setFormConfig({
      name: {
        elementType: "input",
        col: 24,
        elementConfig: {
          type: "input",
          placeholder: "Name",
        },
        value: "",
        label: "Name",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: [],
        touched: false,
      },
      abbr: {
        elementType: "input",
        col: 24,
        elementConfig: {
          type: "input",
          placeholder: "Abbreviation",
        },
        value: "",
        label: "Abbreviation",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: [],
        touched: false,
      },
    });
  }, [languages]);

  //const {items, loading, isVisible, submitting} = useSelector(store => store.datatable);
  const {
    handleFormChange,
    handleFormInject,
    handleFormSubmit,
    handleItemEdit,
    handleItemDelete,
    handleToggle,
    formIsValid,
    formObject,
    isVisible,
  } = useFormHandler(apiService, formConfig, items, languages, setLanguages);
  const objName = "language";

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
          <AntButton.Group>
            <AntButton
              type="dashed"
              shape="circle"
              icon={<EditOutlined />}
              size="large"
              onClick={() => handleItemEdit(record.id)}
            />
            <Popconfirm
              title="Sure to Delete?"
              onConfirm={() => handleItemDelete(record.id)}
            >
              <AntButton
                type="danger"
                shape="circle"
                icon={<DeleteOutlined />}
                size="large"
              />
            </Popconfirm>
          </AntButton.Group>
        );
      },
    },
  ];

  return (
    <div className="table-container">
      <Title level={3}>{title}</Title>
      <Button
        style={{ marginBottom: 16, marginRight: 16, width: "fit-content" }}
        icon={<PlusOutlined />}
        type="primary"
        onClick={handleToggle}
      >
        Add new {objName}
      </Button>
      <FormDrawer
        isVisible={isVisible}
        objName={objName}
        formElementsArray={formObject}
        onChange={handleFormChange}
        onInjectValue={handleFormInject}
        formIsValid={formIsValid}
        onSubmit={handleFormSubmit}
        onToggle={handleToggle}
      />
      <DataTable
        items={items}
        dtConfigColumns={dtConfigColumns}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Languages;
