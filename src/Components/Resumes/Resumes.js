import { useEffect, useRef, useState } from "react";
import "./Resumes.css";
import Resume from "../Resume/Resume";
import Resume2 from "../Resume/Resume2/Resume2";
import Resume3 from "../Resume/Resume3/Resume3";
import Resume4 from "../Resume/Resume4/Resume4";
import Resume5 from "../Resume/Resume5/Resume5";
import { ResumeWrapper } from "../Wrappers/Wrappers";
import ReactToPrint from "react-to-print";
import { Button, Select } from "antd";
import {
  DownloadOutlined,
  FileDoneOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../context/Language";
import CoverLetter from "../CoverLetter/CoverLetter";

function Resumes({ questions, setQuestions }) {
  const colors = [
    "#239ce2",
    "#48bb78",
    "#0bc5ea",
    "#6f96c3",
    "#e3654f",
    "#9b4b8c",
  ];
  const [activeColor, setActiveColor] = useState(colors[0]);
  let [template, setTemplate] = useState(1);
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
  };

  return (
    <div>
      <div className="toolbar">
        <div className="colors">
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${"color"} ${activeColor === item ? "active" : ""}`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>
        <div style={{ display: "flex" }}>
          <Select
            defaultValue={1}
            value={template}
            onChange={handleTemplateChange}
            options={[1, 2, 3, 4, 5].map((item) => ({
              value: item,
              label: `Template ${item}`,
            }))}
            style={{margin: '0 10px'}}
          />
          <CoverLetter title={t("button.coverLetter")} questions={questions} />
          <Button
            type="primary"
            style={{ borderRadius: "2px 0 0 2px", margin: "0 10px" }}
          >
            <SaveOutlined />
            {t("button.save")}
          </Button>
          <ReactToPrint
            trigger={() => {
              return (
                <Button type="primary" style={{ borderRadius: "2px 0 0 2px" }}>
                  <DownloadOutlined />
                  {t("button.download")}
                </Button>
              );
            }}
            content={() => resumeRef.current}
          />
        </div>
      </div>
      <ResumeWrapper ref={resumeRef}>
        {template===1 && <Resume
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
        />}
        {template===2 && <Resume2
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
        />}
        {template===3 && <Resume3
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
        />}
        {template===4 && <Resume4
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
        />}
        {template===5 && <Resume5
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
        />}
      </ResumeWrapper>
    </div>
  );
}

export default Resumes;
