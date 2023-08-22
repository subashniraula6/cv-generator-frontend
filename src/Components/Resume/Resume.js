import React, { forwardRef, useEffect, useState } from "react";
import "./Resume.css";
import { Space, Row, Col, Spin } from "antd";
import UpdateResume from "../Common/UpdateResume";
import UpdateResumeWrapper from "../Wrappers/UpdateResumeWrapper";
import {
  GlobalOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { SectionHeading } from "../Wrappers/SectionHeading";

const Resume = forwardRef(({ questions, setQuestions, activeColor }, ref) => {
  const [groupedExperience, setGroupedExperience] = useState({});
  const [groupedEducation, setGroupedEducation] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
      groupQuestions(questions["workExperience"]["questions"])
    );
    setGroupedEducation(
      groupQuestions(questions["education"]["questions"])
    );
  }, [questions]);

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
                index={8}
                title="Edit Phone Number"
                questions={questions}
                setQuestions={setQuestions}
              />
              <div>
                {questions?.basicInfo?.questions.find((q) => q.index === 8)
                  ?.answer && <PhoneOutlined />}{" "}
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 8)
                    ?.answer
                }
              </div>
            </UpdateResumeWrapper>
            <UpdateResumeWrapper className="email">
              <UpdateResume
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={9}
                title="Edit Email"
                questions={questions}
                setQuestions={setQuestions}
              />
              <div>
                {questions?.basicInfo?.questions.find((q) => q.index === 9)
                  ?.answer && <MailOutlined />}{" "}
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 9)
                    ?.answer
                }
              </div>
            </UpdateResumeWrapper>
            <UpdateResumeWrapper className="linkedin">
              <UpdateResume
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={10}
                title="Edit Linkedin profile"
                questions={questions}
                setQuestions={setQuestions}
              />
              <div>
                {questions?.basicInfo?.questions.find((q) => q.index === 10)
                  ?.answer && <LinkedinOutlined />}{" "}
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 10)
                    ?.answer
                }
              </div>
            </UpdateResumeWrapper>
            <UpdateResumeWrapper className="website">
              <UpdateResume
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={11}
                title="Edit Website"
                questions={questions}
                setQuestions={setQuestions}
              />
              <div>
                {questions?.basicInfo?.questions.find((q) => q.index === 11)
                  ?.answer && <GlobalOutlined />}{" "}
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 11)
                    ?.answer
                }
              </div>
            </UpdateResumeWrapper>
          </div>
          <UpdateResumeWrapper className="skill">
            <UpdateResume
              key={JSON.stringify(questions)}
              section="basicInfo"
              index={13}
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
                    .find((q) => q.index === 13)
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
              index={14}
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
                    .find((q) => q.index === 14)
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
            <Spin spinning={isLoading}>
              <UpdateResume
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={53}
                title="Edit Profile Summary"
                questions={questions}
                setQuestions={setQuestions}
                AIField={true}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <SectionHeading activeColor={activeColor}>Profile Summary</SectionHeading>
              <div className="profile-content">
                <p>
                  {
                    questions?.basicInfo?.questions.find((q) => q.index === 53)
                      ?.answer
                  }
                </p>
              </div>
            </Spin>
          </UpdateResumeWrapper>
          <hr />
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
                <SectionHeading activeColor={activeColor}>Certificates</SectionHeading>
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
            {questions?.workExperience?.questions &&
              !questions?.workExperience?.removed && (
                <>
                  <SectionHeading activeColor={activeColor}>Work Experience</SectionHeading>
                  <div className="info-experience">
                    {
                      // resumeSelector?.workExp?.map((workExp, idx) => (
                      groupedExperience &&
                        Object.keys(groupedExperience).map((group) => {
                          return (
                            <div className="experience-content">
                              <div className="experience-content more-info">
                                <Row justify={"space-between"} align={"top"}>
                                  <Col>
                                    <Row justify={"center"} align={"middle"}>
                                      <Col>
                                        <UpdateResumeWrapper className="info-position">
                                          <UpdateResume
                                            key={JSON.stringify(questions)}
                                            section="workExperience"
                                            index={
                                              groupedExperience[group][1].index
                                            }
                                            title="Edit Profile Summary"
                                            questions={questions}
                                            setQuestions={setQuestions}
                                          />
                                          {groupedExperience[group][1].answer}
                                        </UpdateResumeWrapper>
                                      </Col>
                                      <Col>{" - "}</Col>
                                      <Col>
                                        <UpdateResumeWrapper className="info-company">
                                          <UpdateResume
                                            key={JSON.stringify(questions)}
                                            section="workExperience"
                                            index={
                                              groupedExperience[group][0].index
                                            }
                                            title="Edit Profile Summary"
                                            questions={questions}
                                            setQuestions={setQuestions}
                                          />
                                          {groupedExperience[group][0].answer}
                                        </UpdateResumeWrapper>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span>
                                      <UpdateResumeWrapper className="info-position">
                                        <UpdateResume
                                          key={JSON.stringify(questions)}
                                          section="workExperience"
                                          index={
                                            groupedExperience[group][2].index
                                          }
                                          title="Edit Profile Summary"
                                          questions={questions}
                                          setQuestions={setQuestions}
                                        />
                                        {groupedExperience[group][2].answer}
                                      </UpdateResumeWrapper>
                                    </span>
                                    <span>{" - "}</span>
                                    <span>
                                      <UpdateResumeWrapper className="info-position">
                                        <UpdateResume
                                          key={JSON.stringify(questions)}
                                          section="workExperience"
                                          index={
                                            groupedExperience[group][3].index
                                          }
                                          title="Edit Profile Summary"
                                          questions={questions}
                                          setQuestions={setQuestions}
                                        />
                                        {groupedExperience[group][3].answer}
                                      </UpdateResumeWrapper>
                                    </span>
                                  </Col>
                                </Row>
                              </div>
                              <div className="work-description">
                                <p>
                                  {
                                    <UpdateResumeWrapper className="info-position">
                                      <UpdateResume
                                        key={JSON.stringify(questions)}
                                        section="workExperience"
                                        index={
                                          groupedExperience[group][4].index
                                        }
                                        title="Edit Profile Summary"
                                        questions={questions}
                                        setQuestions={setQuestions}
                                      />
                                      &bull;{" "}
                                      {groupedExperience[group][4].answer}
                                    </UpdateResumeWrapper>
                                  }
                                </p>
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
            {questions?.education?.questions &&
              !questions?.education?.removed && (
                <>
                  <SectionHeading activeColor={activeColor}>Education</SectionHeading>
                  <div className="info-education">
                    {
                      // resumeSelector?.workExp?.map((workExp, idx) => (
                      groupedEducation &&
                        Object.keys(groupedEducation).map((group) => {
                          return (
                            <div className="education-content">
                              <div className="education-content more-info">
                                <Row justify={"space-between"} align={"top"}>
                                  <Col>
                                    <Row justify={"start"} align={"middle"}>
                                      <Col>
                                        <UpdateResumeWrapper className="info-position">
                                          <UpdateResume
                                            key={JSON.stringify(questions)}
                                            section="education"
                                            index={
                                              groupedEducation[group][1].index
                                            }
                                            title="Edit Profile Summary"
                                            questions={questions}
                                            setQuestions={setQuestions}
                                          />
                                          {groupedEducation[group][1].answer}
                                        </UpdateResumeWrapper>
                                      </Col>
                                      <Col>
                                        <UpdateResumeWrapper className="info-college">
                                          <UpdateResume
                                            key={JSON.stringify(questions)}
                                            section="education"
                                            index={
                                              groupedEducation[group][2].index
                                            }
                                            title="Edit Profile Summary"
                                            questions={questions}
                                            setQuestions={setQuestions}
                                          />
                                          {groupedEducation[group][2].answer &&
                                            " - "}{" "}
                                          {groupedEducation[group][2].answer}
                                        </UpdateResumeWrapper>
                                      </Col>
                                    </Row>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "start",
                                        alignItems: "end",
                                      }}
                                    >
                                      <UpdateResumeWrapper
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          paddingY: 0,
                                        }}
                                      >
                                        <UpdateResume
                                          key={JSON.stringify(questions)}
                                          section="education"
                                          index={
                                            groupedEducation[group][3].index
                                          }
                                          title="Edit Profile Summary"
                                          questions={questions}
                                          setQuestions={setQuestions}
                                        />
                                        <span
                                          style={{
                                            whiteSpace: "nowrap",
                                            textOverflow: "inherit",
                                          }}
                                        >
                                          {groupedEducation[group][3].answer}
                                        </span>
                                      </UpdateResumeWrapper>
                                      <UpdateResumeWrapper>
                                        <UpdateResume
                                          key={JSON.stringify(questions)}
                                          section="education"
                                          index={
                                            groupedEducation[group][0].index
                                          }
                                          title="Edit Profile Summary"
                                          questions={questions}
                                          setQuestions={setQuestions}
                                        />
                                        {groupedEducation[group][0].answer &&
                                          ","}{" "}
                                        {groupedEducation[group][0].answer}
                                      </UpdateResumeWrapper>
                                    </div>
                                  </Col>
                                  <Col
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span>
                                      <UpdateResumeWrapper className="info-position">
                                        <UpdateResume
                                          key={JSON.stringify(questions)}
                                          section="education"
                                          index={
                                            groupedEducation[group][4].index
                                          }
                                          title="Edit Profile Summary"
                                          questions={questions}
                                          setQuestions={setQuestions}
                                        />
                                        {groupedEducation[group][4].answer}
                                      </UpdateResumeWrapper>
                                    </span>
                                    <span>{" - "}</span>
                                    <span>
                                      <UpdateResumeWrapper
                                        style={{ width: "auto" }}
                                      >
                                        <UpdateResume
                                          key={JSON.stringify(questions)}
                                          section="education"
                                          index={
                                            groupedEducation[group][5].index
                                          }
                                          title="Edit Profile Summary"
                                          questions={questions}
                                          setQuestions={setQuestions}
                                        />
                                        {groupedEducation[group][5].answer}
                                      </UpdateResumeWrapper>
                                    </span>
                                  </Col>
                                </Row>
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
          <UpdateResumeWrapper className="awards">
            <UpdateResume
              section="basicInfo"
              index={52}
              title="Edit Awards"
              questions={questions}
              setQuestions={setQuestions}
            />
            <SectionHeading activeColor={activeColor}>Awards</SectionHeading>
            <div className="awards-content">
              <Space wrap>
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
