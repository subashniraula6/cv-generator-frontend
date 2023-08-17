import React, { forwardRef, useEffect, useState } from "react";
import "./Resume.css";
import { Layout, Space, Row, Col } from "antd";
import UpdateResume from "../Common/UpdateResume";
import UpdateResumeWrapper from "../Wrappers/UpdateResumeWrapper";

const { Sider, Content } = Layout;

const Resume = forwardRef(({ questions, setQuestions, activeColor }, ref) => {
  const [groupedExperience, setGroupedExperience] = useState({});
  const [groupedEducation, setGroupedEducation] = useState({});

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

  useEffect(() => {
    setGroupedExperience(
      groupQuestions(questions["workExperiencePast"]["questions"])
    );
    setGroupedEducation(
      groupQuestions(questions["educationPast"]["questions"])
    );
  }, [questions]);
  console.log("groupedExperience", groupedExperience);
  console.log("groupedEducation", groupedEducation);

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
                title="Edit First Name"
                questions={questions}
                setQuestions={setQuestions}
              />
              {questions?.basicInfo?.questions.find((q) => q.index === 1)
                ?.answer.length === 0 && "FNAME"}{" "}
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
                title="Edit Last Name"
                questions={questions}
                setQuestions={setQuestions}
              />
              {questions?.basicInfo?.questions.find((q) => q.index === 2)
                ?.answer.length === 0 && "LNAME"}
              {" " +
                questions?.basicInfo?.questions.find((q) => q.index === 2)
                  ?.answer}
            </UpdateResumeWrapper>
            <UpdateResumeWrapper className="title">
              <UpdateResume
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={3}
                title="Edit Title"
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
                title="Edit Phone Number"
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
              title="Edit Skill's"
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
                          key={skill}
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
              title="Edit Language Skills"
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
                          key={language}
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
              index={50}
              title="Edit Interests"
              questions={questions}
              setQuestions={setQuestions}
            />
            {
              // questions?.basicInfo?.questions[8].answer &&
              <>
                <h4>Interests</h4>
                <Space direction="vertical">
                  {questions?.basicInfo?.questions
                    .find((q) => q.index === 50)
                    ?.answer.split(",")
                    .map((interest) => {
                      return interest ? (
                        <span
                          key={interest}
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
              index={56}
              title="Edit Profile Summary"
              questions={questions}
              setQuestions={setQuestions}
            />
            <h4>Profile Summary</h4>
            <div className="profile-content">
              <p>
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 56)
                    ?.answer
                }
              </p>
            </div>
          </UpdateResumeWrapper>
          <UpdateResumeWrapper className="info-profile">
            <UpdateResume
              key={JSON.stringify(questions)}
              section="basicInfo"
              index={51}
              title="Edit Certificates"
              questions={questions}
              setQuestions={setQuestions}
            />{" "}
            {
              // questions?.basicInfo?.questions[8].answer &&
              <>
                <h4>Certificates</h4>
                <Space wrap={true}>
                  {questions?.basicInfo?.questions
                    .find((q) => q.index === 51)
                    ?.answer.split(",")
                    .map((certificate) => {
                      return certificate ? (
                        <span
                          key={certificate}
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
            {questions?.workExperiencePast?.questions &&
              !questions?.workExperiencePast?.removed && (
                <>
                  <h4>Work Experience</h4>
                  <div className="info-experience">
                    {
                      // resumeSelector?.workExp?.map((workExp, idx) => (
                      groupedExperience &&
                        Object.keys(groupedExperience).map((group) => {
                          return (
                            <div className="experience-content">
                              <div className="experience-content more-info">
                                <Row justify={"space-between"}>
                                  <Col>
                                    <span>
                                      <UpdateResumeWrapper className="info-profile">
                                        <UpdateResume
                                          key={JSON.stringify(questions)}
                                          section="workExperiencePast"
                                          index={
                                            groupedExperience[group][1].index
                                          }
                                          title="Edit Profile Summary"
                                          questions={questions}
                                          setQuestions={setQuestions}
                                        />
                                        {groupedExperience[group][1].answer}
                                      </UpdateResumeWrapper>
                                    </span>
                                    <span> - </span>
                                    <span>
                                      <UpdateResumeWrapper className="info-profile">
                                        <UpdateResume
                                          key={JSON.stringify(questions)}
                                          section="workExperiencePast"
                                          index={
                                            groupedExperience[group][0].index
                                          }
                                          title="Edit Profile Summary"
                                          questions={questions}
                                          setQuestions={setQuestions}
                                        />
                                        {groupedExperience[group][0].answer}
                                      </UpdateResumeWrapper>
                                    </span>
                                  </Col>
                                  <Col>
                                    <span>
                                      {groupedExperience[group][2].answer} -{" "}
                                      {groupedExperience[group][3].answer}
                                    </span>
                                  </Col>
                                </Row>
                                <div className="work-content">
                                  <p>
                                    {questions?.workExperiencePast?.questions.find(
                                      (q) => q.index === 1011
                                    )?.answer && (
                                      <span
                                        className="skills-name"
                                        style={{ whiteSpace: "nowrap" }}
                                      >
                                        &bull;{" "}
                                        {
                                          questions?.workExperiencePast?.questions.find(
                                            (q) => q.index === 1011
                                          )?.answer
                                        }
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })
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
          <UpdateResumeWrapper className="awards">
            <UpdateResume
              section="basicInfo"
              index={52}
              title="Edit Awards"
              questions={questions}
              setQuestions={setQuestions}
            />
            <h4>Awards</h4>
            <div className="awards-content">
              <Space>
                {questions?.basicInfo?.questions
                  .find((q) => q.index === 52)
                  ?.answer?.split(",")
                  .map((award) => {
                    return award ? (
                      <span
                        key={award}
                        className="skills-name"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        &bull; {award}
                      </span>
                    ) : null;
                  })}
              </Space>
            </div>
          </UpdateResumeWrapper>
        </div>
      </div>
    </div>
  );
});

export default Resume;
