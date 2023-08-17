import { useRef, useState } from "react";
import "./Resumes.css";
import Resume from "../Resume/Resume";
import Resume2 from "../Resume/Resume2/Resume2";
import Resume3 from "../Resume/Resume3/Resume3";
import { ResumeWrapper } from "../Wrappers/Wrappers";
import ReactToPrint from "react-to-print";
import { Button } from "antd";
import { DownloadOutlined, SaveOutlined } from "@ant-design/icons";

function Resumes({ questions, setQuestions }) {
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
  const [activeColor, setActiveColor] = useState(colors[0]);
  const resumeRef = useRef();

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
        <div style={{display: 'flex'}}>
          <Button type="primary" style={{ borderRadius: '2px 0 0 2px', margin: '0 10px' }}>
            <SaveOutlined />
              Save
          </Button>
          <ReactToPrint
            trigger={() => {
              return (
                <Button type="primary" style={{ borderRadius: '2px 0 0 2px' }}>
                  <DownloadOutlined />
                  Download
                </Button>
              );
            }}
            content={() => resumeRef.current}
          />
        </div>
      </div>
      <ResumeWrapper ref={resumeRef}>
        <Resume
          questions={questions}
          setQuestions={setQuestions}
          activeColor={activeColor}
        />
      </ResumeWrapper>

      {/* <ResumeWrapper>
        <Resume2
          questions={questions}
          setQuestions={setQuestions}
          activeColor={activeColor}
        />
      </ResumeWrapper>

      <ResumeWrapper>
        <Resume3
          questions={questions}
          setQuestions={setQuestions}
          activeColor={activeColor}
        />
      </ResumeWrapper> */}
    </div>
  );
}

export default Resumes;
