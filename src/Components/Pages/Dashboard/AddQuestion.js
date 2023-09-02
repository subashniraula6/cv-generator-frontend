import React, { useEffect, useState } from "react";
import DataTable from "./dataTable";
import "./AddQuestion.css";
import FormDrawer from "./formDrawer";
import { Button as AntButton, Popconfirm, Typography } from "antd";
import { Button } from "../../Common/Button";
import { useFormHandler } from "./formHook";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import importedQuestions from "../../../Questions";
import { useLanguage } from "../../../context/Language";
import { toSentenceCase, toCamelCase } from "../../../utils";

const { Title } = Typography;

const dtConfig = [
  {
    title: "index",
    dataIndex: "index",
    textFilter: true,
    sorter: (a, b) => a.index - b.index,
  },
  {
    title: "Section",
    dataIndex: "title",
    textFilter: true,
  },
  {
    title: "Question",
    dataIndex: "question",
    textFilter: true,
  },
  {
    title: "type",
    dataIndex: "type",
    textFilter: true,
  },
];

const apiService = { props: {} };
const title = "Questions";
const roleLevel = "props";
const AddQuestion = (props) => {
  // Data
  const [questions, setQuestions] = useState({});
  const [items, setItems] = useState([]);
  const [sections, setSections] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(()=> {
    // Fetch questions and setQuestions
    setQuestions(importedQuestions);
  }, [])

  useEffect(() => {
    let sections = Object.keys(questions);
    let tempItems = [];
    let tempTypes = [];
    let tempSections = [];
    sections?.forEach((section) => {
      if (section === "isNext") return;
      tempSections.push({
        label: questions[section]["title"]["en"],
        value: section,
      });
      questions[section]["questions"]?.forEach((question) => {
        let item = {};
        item["title"] = questions[section]["title"]["en"];
        item["repeatable"] = questions[section]["repeatable"];
        item["question"] = question["question"]["en"];
        item["index"] = question["index"];
        item["type"] = question["type"];
        tempItems.push(item);
        if (!tempTypes.includes(question["type"])) {
          tempTypes.push(question["type"]);
        }
      });
    });
    setSections(tempSections);
    setItems(tempItems);
    setTypes(
      tempTypes.map((type) => ({ label: toSentenceCase(type), value: type }))
    );
  }, [questions]);
  
  // Config
  const [formConfig, setFormConfig] = useState({});
  useEffect(()=> {
    setFormConfig({
      question: {
        elementType: "textarea",
        col: 24,
        elementConfig: {
          type: "textarea",
          placeholder: "Question",
        },
        value: "",
        label: "Question",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: [],
        touched: false,
      },
      section: {
        elementType: "select-addable",
        col: 20,
        elementConfig: {
          options: sections
        },
        value: "",
        label: "Section",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: [],
        touched: false,
      },
      type: {
        elementType: "select",
        col: 10,
        elementConfig: {
          options: [...types],
        },
        value: "",
        label: "Type",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: [],
        touched: false,
      },
    })
  }, [types, sections, questions])
  
  const addDropdownOption = (id, option) => {
    setSections([...sections, { value: toCamelCase(option), label: option }])
  };

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
  } = useFormHandler(apiService, formConfig, items, questions, setQuestions);
  const objName = "question";

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
        addDropdownOption={addDropdownOption}
      />
      <DataTable
        items={items}
        dtConfigColumns={dtConfigColumns}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default AddQuestion;
