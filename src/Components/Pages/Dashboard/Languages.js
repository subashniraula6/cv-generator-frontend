import React, { useEffect, useState } from "react";
import DataTable from "./dataTable";
import "./AddQuestion.css";
import FormDrawer from "./formDrawer";
import { Button, Popconfirm, Typography } from "antd";
import { useFormHandler } from "./formHook";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

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
  // Data
  const [languages, setLanguages] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch questions and setQuestions
    setLanguages([
      { index: 1, name: "English", abbr: "en" },
      { index: 2, name: "Swedish", abbr: "sv" },
    ]);
  }, []);

  useEffect(() => {
    setItems(languages);
  }, [languages]);

  // Config
  const [formConfig, setFormConfig] = useState({});
  useEffect(() => {
    setFormConfig({
      index: {
        elementType: "input",
        col: 24,
        elementConfig: {
          type: "input",
          placeholder: "Index",
        },
        value: "",
        label: "Index",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: [],
        touched: false,
      },
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
          <Button.Group>
            <Button
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

  return (
    <div className="table-container">
      <Title level={3}>{title}</Title>
      <Button
        style={{ marginBottom: 16, marginRight: 16, width: "fit-content" }}
        icon={<PlusOutlined />}
        outline="true"
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
