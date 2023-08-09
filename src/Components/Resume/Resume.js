import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./Resume.css";
import { Layout, Space, Row, Col, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
const { Sider, Content } = Layout;

const Resume = forwardRef(({ questions, setQuestions }, ref) => {
  return (
    <div className="_container">
      <div className="sider">
        <div className="info-header">
          <div className="name-style">
            <h2>
              {
                questions?.basicInfo?.questions.find((q) => q.index === 1)
                  ?.answer
              }
            </h2>
            <h4>
              {(questions?.basicInfo?.questions.find((q) => q.index === 2)
                ?.answer
                ? "- "
                : "") +
                questions?.basicInfo?.questions.find((q) => q.index === 2)
                  ?.answer}
            </h4>
          </div>
          <div className="contact-info">
            <small>
              <label className="contact-label">
                {/* {
                  <>
                    {questions?.basicInfo?.questions.find((q) => q.index === 6)
                      .answer && <MailOutlined />}
                    <p>
                      {
                        questions?.basicInfo?.questions.find(
                          (q) => q.index === 6
                        )?.answer
                      }
                    </p>
                  </>
                } */}
              </label>
            </small>
            <p>
              {
                questions?.basicInfo?.questions.find((q) => q.index === 6)
                  ?.answer
              }
            </p>
          </div>
          <div className="side-menu">
            {
              // questions?.basicInfo?.questions[7].answer &&
              <>
                <h4>Skill's</h4>
                <Space direction="vertical">
                  {questions?.basicInfo?.questions
                    .find((q) => q.index === 8)
                    ?.answer.split(",")
                    .map((skill) => (
                      <span
                        className="skills-name"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        &bull; {skill}
                      </span>
                    ))}
                </Space>
              </>
            }
          </div>
          <div className="side-menu">
            {
              // questions?.basicInfo?.questions[8].answer &&
              <>
                <h4>Language skills</h4>
                <Space direction="vertical">
                  {questions?.basicInfo?.questions
                    .find((q) => q.index === 9)
                    ?.answer.split(",")
                    .map((language) => (
                      <span
                        className="skills-name"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        &bull; {language}
                      </span>
                    ))}
                </Space>
              </>
            }
          </div>
          <div className="side-menu">
            {
              // questions?.basicInfo?.questions[8].answer &&
              <>
                <h4>Interests</h4>
                <Space direction="vertical">
                  {questions?.basicInfo?.questions
                    .find((q) => q.index === 12)
                    ?.answer.split(",")
                    .map((interest) => (
                      <span
                        className="skills-name"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        &bull; {interest}
                      </span>
                    ))}
                </Space>
              </>
            }
          </div>
        </div>
      </div>
      <div className="content">
        <div style={{ padding: "40px" }}>
          <div className="info-profile">
            <h4>Profile Summary</h4>
            <div className="profile-content">
              <p>
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 18)
                    ?.answer
                }
              </p>
            </div>
          </div>
          <div className="info-profile">
            {
              // questions?.basicInfo?.questions[8].answer &&
              <>
                <h4>Certificates</h4>
                <Space>
                  {questions?.basicInfo?.questions
                    .find((q) => q.index === 13)
                    ?.answer.split(",")
                    .map((certificate) => (
                      <span
                        className="skills-name"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        &bull; {certificate}
                      </span>
                    ))}
                </Space>
              </>
            }
          </div>
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
          <div className="info-profile">
            <h4>Awards</h4>
            <div className="awards-content">
              <Space>
                {questions?.basicInfo?.questions
                  .find((q) => q.index === 14)
                  ?.answer?.split(",")
                  .map((awards) => (
                    <span
                      className="skills-name"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      &bull; {awards}
                    </span>
                  ))}
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Resume;
