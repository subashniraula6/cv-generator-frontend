import React, { useEffect, useState } from "react";
import DataTable from "./dataTable";
import "./AddQuestion.css";
import FormDrawer from "./formDrawer";
import {
  Button as AntButton,
  Drawer,
  Popconfirm,
  Typography,
  notification,
} from "antd";
import { Button } from "../../Common/Button";
import { useFormHandler } from "./formHook";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../../context/Language";
import { toSentenceCase, toCamelCase, orderQuestions } from "../../../utils";
import axios from "../../../axios/axios";
import ProgressBar from "../../Common/ProgressBar/ProgressBar";
import TranslateDrawer from "./TranslateDrawer";

const { Title } = Typography;

const dtConfig = [
  {
    title: "index",
    dataIndex: "id",
    textFilter: true,
    sorter: (a, b) => a.id - b.id,
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
  let [renderCount, setRenderCount] = useState(0)
  let [fetchPogress, setFetchProgress] = useState(null);
  let { language: lang } = useLanguage();
  let [currentRecord, setCurrentRecord] = useState(null);

  // Data
  const [questionsIndex, setQuestionsIndex] = useState(null);
  const [questions, setQuestions] = useState({});
  const [applicationQuestions, setApplicationQuestions] = useState({});
  const [items, setItems] = useState([]);
  const [sections, setSections] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Fetch questions and setQuestions
    axios
      .get("kneg/questions", {
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setFetchProgress(percentCompleted);
        },
      })
      .then(({ data }) => {
        setApplicationQuestions(data.data);
        let langBasedQuestion = data.data.find(
          (question) => question.language === lang
        );
        if (langBasedQuestion) {
          let currentQuestions = JSON.parse(langBasedQuestion.question_JSON);
          let orderedQuestions = orderQuestions(currentQuestions);
          setQuestions({ ...orderedQuestions, isNext: false });
          setQuestionsIndex(langBasedQuestion.id);
        } else {
          setQuestions({});
          setQuestionsIndex(null);
        }
      })
      .catch((err) => {
        notification.error({
          message: "Fetching questions error",
          description: err.message,
        });
        console.log(err);
      });
  }, [lang, renderCount]);

  useEffect(() => {
    let sections = Object.keys(questions);
    let tempItems = [];
    let tempTypes = [];
    let tempSections = [];
    sections?.forEach((section) => {
      if (section === "isNext" || section === "lang") return;
      tempSections.push({
        label: questions[section]["title"],
        value: section,
      });
      questions[section]["questions"]?.forEach((question) => {
        let item = {};
        item["title"] = questions[section]["title"];
        item["question"] = question["question"];
        item["id"] = question["index"];
        item["type"] = question["type"];
        item["section"] = section;
        item["isCustom"] = question["isCustom"] || false;
        item["originalId"] = question["index"];
        item["originalSection"] = section;
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
  useEffect(() => {
    setFormConfig({
      section: {
        elementType: "select-addable",
        col: 20,
        elementConfig: {
          options: sections,
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
    });
  }, [types, sections, questions]);

  // Translate Drawer
  let [translate, setTranslate] = useState(false);

  const addDropdownOption = (id, option) => {
    setSections([...sections, { value: toCamelCase(option), label: option }]);
  };

  const handleSave = (formdata, index) => {
    axios
      .put(
        "/kneg/question/" + index,
        JSON.stringify({ question_JSON: formdata })
      )
      .then((res) => {
        setRenderCount(renderCount+1)
        notification.success({
          message: res.data.message,
        });
      })
      .catch((err) => {
        notification.error({
          message: "Fetching questions error",
          description: err.message,
        });
        setQuestions({});
        setQuestionsIndex(null);
      });
  };

  const saveDelete = (section, id) => {
    let updatedQuestions = JSON.parse(JSON.stringify(questions));
    updatedQuestions[section]["questions"] = updatedQuestions[section][
      "questions"
    ].filter((q) => q.index != id);
    handleSave(updatedQuestions, questionsIndex);
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
    action,
  } = useFormHandler(
    apiService,
    formConfig,
    items,
    questions,
    handleSave,
    saveDelete,
    questionsIndex
  );
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

  const handleQuestionTranslate = (record) => {
    setTranslate(true);
    setCurrentRecord(record);
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
            <AntButton
              type="dashed"
              shape="circle"
              icon={<SettingOutlined />}
              size="large"
              onClick={() => handleQuestionTranslate(record)}
            />
            {record.isCustom && (
              <Popconfirm
                title="Sure to Delete?"
                onConfirm={() => handleItemDelete(record.section, record.id)}
              >
                <AntButton
                  type="danger"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  size="large"
                />
              </Popconfirm>
            )}
          </AntButton.Group>
        );
      },
    },
  ];
  if (fetchPogress >= 0 && fetchPogress < 100)
    return <ProgressBar progress={fetchPogress} />;
  return (
    <div className="table-container">
      <Title level={3}>{title}</Title>
      <Button
        style={{ marginBottom: 16, marginRight: 16, width: "fit-content" }}
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => handleToggle("add")}
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
        action={action}
      />
      <TranslateDrawer
        translate={translate}
        setTranslate={setTranslate}
        currentRecord={currentRecord}
        applicationQuestions={applicationQuestions}
        handleSave={handleSave}
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
