import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./Resume.css";
import { Layout, Space, Row, Col, Typography, Button, Popover } from "antd";
import { CloseOutlined, DeleteOutlined, MailOutlined } from "@ant-design/icons";
import CustomModal from "../Common/CustomModal";
import PopConfirm from "../Common/PopConfirm";
import Field from "../Common/Field";
import UpdateResume from "../Common/UpdateResume";
import UpdateResumeWrapper from "../Wrappers/UpdateResumeWrapper";

const { Sider, Content } = Layout;

const Resume = forwardRef(({ questions, setQuestions, activeColor }, ref) => {
  const [tempQuestions, setTempQuestions] = useState(questions);
  const [fieldKey, setFieldKey] = useState(0); // Used for force re-render input fields inside Modal Component

  useEffect(() => {
    setTempQuestions(questions);
  }, [questions]);

  function handleInputChange(e, section, questionIdx) {
    setTempQuestions({
      ...tempQuestions,
      [section]: {
        ...tempQuestions[section],
        questions: tempQuestions[section]["questions"].map((q) =>
          q.index === questionIdx ? { ...q, answer: e.target.value } : q
        ),
      },
    });
  }

  function handleSelectChange(options, section, questionIdx) {
    let answerStr = options.join(",").trim();
    setTempQuestions({
      ...tempQuestions,
      [section]: {
        ...tempQuestions[section],
        questions: tempQuestions[section]["questions"].map((q) =>
          q.index === questionIdx ? { ...q, answer: answerStr } : q
        ),
      },
    });
  }

  function handleDeleteSection(sectionName) {
    // set removed flag
    setQuestions({
      ...questions,
      [sectionName]: { ...questions[sectionName], removed: true },
    });
  }

  function handleEditSection() {
    setQuestions(tempQuestions);
  }

  function handleCancelSection() {
    setTempQuestions(questions);
    setFieldKey(fieldKey + 1);
  }

  function addDropdownOption(option, section, questionIdx) {
    // add question options
    let updatedQuestions = JSON.parse(JSON.stringify(tempQuestions));
    let quesArrIndex = questions[section]["questions"].findIndex(
      (q) => q.index === questionIdx
    );

    updatedQuestions[section]["questions"][quesArrIndex]["options"] +=
      ", " + option;
    // Update DB
    // Fetch DB and set questions state
    setQuestions(updatedQuestions);
  }
  return (
    <div className="_container">
      <div className="sider" style={{ backgroundColor: activeColor }}>
        <div className="info-header">
          <div className="name-style">
            <UpdateResumeWrapper className="first-name">
              <UpdateResume
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={1}
                questions={questions}
                setQuestions={setQuestions}
              />
              {questions?.basicInfo?.questions.find((q) => q.index === 1)
                ?.answer.length === 0 && "FIRSTNAME"}
              {
                questions?.basicInfo?.questions.find((q) => q.index === 1)
                  ?.answer
              }
            </UpdateResumeWrapper>
            <UpdateResumeWrapper className="last-name">
              <UpdateResume
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={2}
                questions={questions}
                setQuestions={setQuestions}
              />
              {questions?.basicInfo?.questions.find((q) => q.index === 2)
                ?.answer.length === 0 && "LASTNAME"}
              {" " +
                questions?.basicInfo?.questions.find((q) => q.index === 2)
                  ?.answer}
            </UpdateResumeWrapper>
            <UpdateResumeWrapper className="title">
              <UpdateResume
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={3}
                questions={questions}
                setQuestions={setQuestions}
              />
              <h4>
                {questions?.basicInfo?.questions.find((q) => q.index === 3)
                  ?.answer.length === 0 && "TITLE"}
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 3)
                    ?.answer
                }
              </h4>
            </UpdateResumeWrapper>
          </div>
          <div className="contact-info">
            <UpdateResumeWrapper className="phone">
              <UpdateResume
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={7}
                questions={questions}
                setQuestions={setQuestions}
              />
              <p>
                {questions?.basicInfo?.questions.find((q) => q.index === 7)
                  ?.answer.length === 0 && "CONTACT"}
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 7)
                    ?.answer
                }
              </p>
            </UpdateResumeWrapper>
          </div>
          <UpdateResumeWrapper className="skill">
            <UpdateResume
              key={JSON.stringify(questions)}
              section="basicInfo"
              index={9}
              questions={questions}
              setQuestions={setQuestions}
            />
            {
              // questions?.basicInfo?.questions[7].answer &&
              <>
                <h4>Skill's</h4>
                <Space direction="vertical">
                  {questions?.basicInfo?.questions
                    .find((q) => q.index === 9)
                    ?.answer.split(",")
                    .map((skill) => {
                      return skill ? (
                        <span
                          className="skills-name"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          &bull; {skill}
                        </span>
                      ) : null;
                    })}
                </Space>
              </>
            }
          </UpdateResumeWrapper>
          <UpdateResumeWrapper className="side-menu">
            <UpdateResume
              key={JSON.stringify(questions)}
              section="basicInfo"
              index={10}
              questions={questions}
              setQuestions={setQuestions}
            />
            {
              // questions?.basicInfo?.questions[8].answer &&
              <>
                <h4>Language skills</h4>
                <Space direction="vertical">
                  {questions?.basicInfo?.questions
                    .find((q) => q.index === 10)
                    ?.answer.split(",")
                    .map((language) => {
                      return language ? (
                        <span
                          className="skills-name"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          &bull; {language}
                        </span>
                      ) : null;
                    })}
                </Space>
              </>
            }
          </UpdateResumeWrapper>
          <UpdateResumeWrapper className="side-menu">
            <UpdateResume
              key={JSON.stringify(questions)}
              section="basicInfo"
              index={13}
              questions={questions}
              setQuestions={setQuestions}
            />
            {
              // questions?.basicInfo?.questions[8].answer &&
              <>
                <h4>Interests</h4>
                <Space direction="vertical">
                  {questions?.basicInfo?.questions
                    .find((q) => q.index === 13)
                    ?.answer.split(",")
                    .map((interest) => {
                      return interest ? (
                        <span
                          className="skills-name"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          &bull; {interest}
                        </span>
                      ) : null;
                    })}
                </Space>
              </>
            }
          </UpdateResumeWrapper>
        </div>
      </div>
      <div className="content">
        <div style={{ padding: "40px" }}>
        <UpdateResumeWrapper className="info-profile">
            <UpdateResume
              key={JSON.stringify(questions)}
              section="basicInfo"
              index={19}
              questions={questions}
              setQuestions={setQuestions}
            />
            <h4>Profile Summary</h4>
            <div className="profile-content">
              <p>
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 19)
                    ?.answer
                }
              </p>
            </div>
          </UpdateResumeWrapper>
          <UpdateResumeWrapper className="info-profile">
            <UpdateResume
              key={JSON.stringify(questions)}
              section="basicInfo"
              index={14}
              questions={questions}
              setQuestions={setQuestions}
            />            {
              // questions?.basicInfo?.questions[8].answer &&
              <>
                <h4>Certificates</h4>
                <Space>
                  {questions?.basicInfo?.questions
                    .find((q) => q.index === 14)
                    ?.answer.split(",")
                    .map((certificate) => {
                      return certificate ? (
                        <span
                          className="skills-name"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          &bull; {certificate}
                        </span>
                      ) : null;
                    })}
                </Space>
              </>
            }
          </UpdateResumeWrapper>
          <hr />
          <div className="info-profile">
            {questions?.workExperience?.questions && (
              <>
                <h4>Work Experience</h4>
                <div className="info-experience">
                  {
                    // resumeSelector?.workExp?.map((workExp, idx) => (
                    <div className="experience-content">
                      <div className="experience-content more-info">
                        <Row justify={"space-between"}>
                          <Col>
                            <span>
                              {
                                questions?.workExperience?.questions.find(
                                  (q) => q.index === 1003
                                )?.answer
                              }
                            </span>
                            <span> - </span>
                            <span>
                              {
                                questions?.workExperience?.questions.find(
                                  (q) => q.index === 1006
                                )?.answer
                              }
                            </span>
                          </Col>
                          <Col>
                            <span>
                              {
                                questions?.workExperience?.questions.find(
                                  (q) => q.index === 1007
                                )?.answer
                              }{" "}
                              -{" "}
                              {
                                questions?.workExperience?.questions.find(
                                  (q) => q.index === 1009
                                )?.answer
                              }
                            </span>
                          </Col>
                        </Row>
                        <div className="work-content">
                          <p>
                            {questions?.workExperience?.questions.find(
                              (q) => q.index === 1011
                            )?.answer && (
                              <span
                                className="skills-name"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                &bull;{" "}
                                {
                                  questions?.workExperience?.questions.find(
                                    (q) => q.index === 1011
                                  )?.answer
                                }
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    // ))
                  }
                </div>
              </>
            )}
          </div>
          <hr />

          {/* <div className="info-project">
          <Typography.Title level={4}>Projects</Typography.Title>
          <div className="project-content">
            <Space wrap="true">
              {
                resumeSelector?.projects?.map((project, idx) => (
                  <div className="project-content more-info" key={idx}>
                    <Row>
                      <Col>
                        <Typography.Title level={5}>{project?.title?.value}</Typography.Title>
                        <div>
                          <span>{project?.githubLink?.value}</span>
                          <span> | </span>
                          <span>{project?.deployedLink?.value}</span>
                        </div>
                      </Col>
                    </Row>
                    <div className="college-content">
                      <p>{project?.description?.value}</p>
                    </div>
                  </div>
                ))
              }
            </Space>
          </div>
        </div>
        */}

          <div className="info-profile">
            <h4>Education</h4>
            <div className="education-content">
              {
                // resumeSelector?.education?.map((education, idx) => (
                <div className="education-content more-info">
                  <Row justify={"space-between"}>
                    <Col>
                      <span>
                        {
                          questions?.education?.questions.find(
                            (q) => q.index === 2001
                          )?.answer
                        }{" "}
                        -{" "}
                        {questions?.education?.questions.find(
                          (q) => q.index === 2002
                        )?.answer || ""}
                      </span>
                    </Col>
                    <Col>
                      <span>
                        {
                          questions?.education?.questions.find(
                            (q) => q.index === 2003
                          )?.answer
                        }
                      </span>
                      /
                      <span>
                        {
                          questions?.education?.questions.find(
                            (q) => q.index === 2004
                          )?.answer
                        }{" "}
                        -{" "}
                        {questions?.education?.questions.find(
                          (q) => q.index === 2005
                        )?.answer || ""}
                      </span>
                    </Col>
                  </Row>
                </div>
                // ))
              }
            </div>
          </div>

          <hr />
          <div className="info-profile section-wrapper">
            <h4>Awards</h4>
            <div className="awards-content">
              <div className="manage-section">
                <span className="custom-modal">
                  <CustomModal
                    handleEditSection={(e) => handleEditSection()}
                    handleCancelSection={(e) => handleCancelSection()}
                    title="Edit First Name"
                  >
                    {questions?.basicInfo?.questions.find(
                      (q) => q.index === 15
                    ) && (
                      <Field
                        key={fieldKey}
                        question={questions?.basicInfo?.questions.find(
                          (q) => q.index === 15
                        )}
                        handleInputChange={(e) =>
                          handleInputChange(e, "basicInfo", 15)
                        }
                        handleSelectChange={(e) =>
                          handleSelectChange(e, "basicInfo", 15)
                        }
                        addDropdownOption={(e) =>
                          addDropdownOption(e, "basicInfo", 15)
                        }
                      />
                    )}
                  </CustomModal>
                </span>
                <span className="pop-confirm">
                  <PopConfirm
                    confirm={(e) => handleDeleteSection("basicInfo")}
                  />
                </span>
              </div>
              <Space>
                {questions?.basicInfo?.questions
                  .find((q) => q.index === 15)
                  ?.answer?.split(",")
                  .map((award) => {
                    return award ? (
                      <span
                        className="skills-name"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        &bull; {award}
                      </span>
                    ) : null;
                  })}
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Resume;
