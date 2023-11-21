import { useEffect, useRef, useState } from "react";
import "./Resumes.css";
import Resume from "../Resume/Resume";
import Resume2 from "../Resume/Resume2/Resume2";
import Resume3 from "../Resume/Resume3/Resume3";
import Resume4 from "../Resume/Resume4/Resume4";
import Resume5 from "../Resume/Resume5/Resume5";
import { ResumeWrapper } from "../Wrappers/Wrappers";
import ReactToPrint from "react-to-print";
import { Select, notification } from "antd";
import { Button } from "../Common/Button";
import {
  DownloadOutlined,
  FileDoneOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../context/Language";
import CoverLetter from "../CoverLetter/CoverLetter";
import axios from "../../axios/axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function Resumes({ questions, setQuestions, userQuestionsId }) {
  const colorNames = ["Blue", "Green", "Cyan", "Grey", "Orange", "Magenta"];
  const colors = [
    "#239ce2",
    "#48bb78",
    "#0bc5ea",
    "#6f96c3",
    "#e3654f",
    "#9b4b8c",
  ];
  const [activeColor, setActiveColor] = useState(() => {
    const saved = localStorage.getItem("activeColor");
    const initialValue = saved;
    return initialValue || colors[0];
  });
  let [template, setTemplate] = useState(() => {
    const saved = localStorage.getItem("template");
    const initialValue = parseInt(saved);
    return initialValue || 1;
  });
  const resumeRef = useRef();

  const [groupedExperience, setGroupedExperience] = useState({});
  const [groupedEducation, setGroupedEducation] = useState({});
  const [groupedProject, setGroupedProject] = useState({});
  const [isProfileAILoading, setIsProfileAILoading] = useState(false);
  const [isWorkAILoading, setIsWorkAILoading] = useState(false);

  function groupQuestions(arr) {
    const groupByCategory = arr.reduce((group, question) => {
      const { no } = question;
      if (no) {
        group[no] = group[no] ?? [];
        group[no].push(question);
        return group;
      }
      return {};
    }, {});
    return groupByCategory;
  }

  const { language: lang, t } = useLanguage();

  useEffect(() => {
    setGroupedExperience(
      groupQuestions(questions["workExperience"]["questions"])
    );
    setGroupedEducation(groupQuestions(questions["education"]["questions"]));
    setGroupedProject(groupQuestions(questions["projects"]["questions"]));
  }, [questions]);

  const handleTemplateChange = (selectedTemplate) => {
    setTemplate(selectedTemplate);
    localStorage.setItem("template", selectedTemplate);
  };

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .put(
        "kneg/user_question/" + userQuestionsId,
        JSON.stringify({ question_JSON: questions })
      )
      .then((response) => {
        if (response.status == 200) {
          let updatedJSON = JSON.parse(response.data.data.question_JSON);
          setQuestions(updatedJSON);
          notification.success({
            message: response.data.message,
          });
        } else {
          notification.error({
            message: "Save Error",
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ////////////////////////////////
  // Download PDF Instantly
  ////////////////////////////////
  const handleDownloadPdf = async (e) => {
    e.preventDefault();
    const element = resumeRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    console.log(pdfWidth, pdfHeight)
    pdf.addImage(data, "PNG", 0, 0, 210, 248.4855);
    pdf.save("print.pdf");
  };

  return (
    <div className="resume-main-container">
      <div className="toolbar">
        <div className="colors">
          <Select
            value={activeColor}
            onChange={(color) => {
              setActiveColor(color);
              localStorage.setItem("activeColor", color);
            }}
            style={{
              marginLeft: 10,
              backgroundColor: activeColor,
              width: "120px",
            }}
            size="large"
          >
            {colors.map((item, index) => (
              <Select.Option
                key={item}
                style={{ backgroundColor: item }}
                className={`${"color"} ${activeColor === item ? "active" : ""}`}
              >
                <label style={{ color: "white" }}>{colorNames[index]}</label>
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Select
            defaultValue={1}
            value={template}
            onChange={handleTemplateChange}
            options={[1, 2, 3, 4, 5].map((item) => ({
              value: item,
              label: `Template ${item}`,
            }))}
            size="large"
          />
          <CoverLetter
            title={t("button.coverLetter")}
            questions={questions}
            setQuestions={setQuestions}
          />
          <Button
            type={"primary"}
            icon={<SaveOutlined />}
            iconPosition={"right"}
            style={{ margin: 0 }}
            onClick={handleSave}
          >
            {t("button.save")}
          </Button>
          <ReactToPrint
            trigger={() => {
              return (
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={handleDownloadPdf}
                >
                  {t("button.download")}
                </Button>
              );
            }}
            content={() => resumeRef.current}
          />
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownloadPdf}
          >
            {t("button.download")}zzzz
          </Button>
        </div>
      </div>
      <ResumeWrapper ref={resumeRef}>
        {template === 1 && (
          <Resume
            questions={questions}
            setQuestions={setQuestions}
            activeColor={activeColor}
            groupedExperience={groupedExperience}
            groupedEducation={groupedEducation}
            groupedProject={groupedProject}
            isProfileAILoading={isProfileAILoading}
            isWorkAILoading={isWorkAILoading}
            setIsProfileAILoading={setIsProfileAILoading}
            setIsWorkAILoading={setIsWorkAILoading}
          />
        )}
        {template === 2 && (
          <Resume2
            questions={questions}
            setQuestions={setQuestions}
            activeColor={activeColor}
            groupedExperience={groupedExperience}
            groupedEducation={groupedEducation}
            groupedProject={groupedProject}
            isProfileAILoading={isProfileAILoading}
            isWorkAILoading={isWorkAILoading}
            setIsProfileAILoading={setIsProfileAILoading}
            setIsWorkAILoading={setIsWorkAILoading}
          />
        )}
        {template === 3 && (
          <Resume3
            questions={questions}
            setQuestions={setQuestions}
            activeColor={activeColor}
            groupedExperience={groupedExperience}
            groupedEducation={groupedEducation}
            groupedProject={groupedProject}
            isProfileAILoading={isProfileAILoading}
            isWorkAILoading={isWorkAILoading}
            setIsProfileAILoading={setIsProfileAILoading}
            setIsWorkAILoading={setIsWorkAILoading}
          />
        )}
        {template === 4 && (
          <Resume4
            questions={questions}
            setQuestions={setQuestions}
            activeColor={activeColor}
            groupedExperience={groupedExperience}
            groupedEducation={groupedEducation}
            groupedProject={groupedProject}
            isProfileAILoading={isProfileAILoading}
            isWorkAILoading={isWorkAILoading}
            setIsProfileAILoading={setIsProfileAILoading}
            setIsWorkAILoading={setIsWorkAILoading}
          />
        )}
        {template === 5 && (
          <Resume5
            questions={questions}
            setQuestions={setQuestions}
            activeColor={activeColor}
            groupedExperience={groupedExperience}
            groupedEducation={groupedEducation}
            groupedProject={groupedProject}
            isProfileAILoading={isProfileAILoading}
            isWorkAILoading={isWorkAILoading}
            setIsProfileAILoading={setIsProfileAILoading}
            setIsWorkAILoading={setIsWorkAILoading}
          />
        )}
      </ResumeWrapper>
    </div>
  );
}

export default Resumes;
