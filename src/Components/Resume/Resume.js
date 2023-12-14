import React, { forwardRef, useEffect, useState } from "react";
import "./Resume.css";
import { Space, Row, Col, Spin, Anchor, Tag, Avatar } from "antd";
import UpdateSectionWrapper from "../Wrappers/UpdateSectionWrapper";
import UpdateSection from "../Common/UpdateSection";
import UpdateQuestion from "../Common/UpdateQuestion";
import UpdateItem from "../Common/UpdateItem";
import UpdateQuestionWrapper from "../Wrappers/UpdateQuestionWrapper";
import UpdateItemWrapper from "../Wrappers/UpdateItemWrapper";
import {
  CaretRightOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { SectionHeading } from "../Wrappers/SectionHeading";
import { SubSectionHeading } from "../Wrappers/SubSectionHeading";
import { useLanguage } from "../../context/Language";
import LangRating from "../Common/LangRating/LangRating";
import SimpleDivider from "../Common/Dividers/SimpleDivider";

const Resume = forwardRef(
  (
    {
      questions,
      setQuestions,
      activeColor,
      groupedExperience,
      groupedEducation,
      groupedProject,
      isProfileAILoading,
      setIsProfileAILoading,
      isWorkAILoading,
      setIsWorkAILoading,
    },
    ref
  ) => {
    const { Link } = Anchor;
    const { language: lang, t } = useLanguage();
    const pictureWrapperStyle = {
      width: "fit-content",
      left: "50%",
      transform: "translateX(-50%)",
    };
    return (
      <div className="resume-container">
        <div className="sider1">
          <div className="info-header info-header-1">
            <div className="picture">
              {/* Picture */}
              <UpdateQuestionWrapper
                className="picture"
                display={"block"}
                style={pictureWrapperStyle}
                removed={
                  // questions?.basicInfo?.questions.find((q) => q.index === 5)
                  //   ?.removed
                  true
                }
              >
                <UpdateQuestion
                  key={JSON.stringify(questions)}
                  section="basicInfo"
                  index={5}
                  title="Edit Picture"
                  questions={questions}
                  setQuestions={setQuestions}
                />
                <Avatar
                  shape="circle"
                  size={150}
                  icon={<UserOutlined />}
                  src={
                    questions?.basicInfo?.questions.find((q) => q.index === 5)
                      ?.answer
                  }
                />
              </UpdateQuestionWrapper>
            </div>
            <div className="name-style">
              {/* First Name */}
              <UpdateQuestionWrapper className="first-name">
                <UpdateQuestion
                  key={JSON.stringify(questions)}
                  section="basicInfo"
                  index={1}
                  title="Edit First Name"
                  questions={questions}
                  setQuestions={setQuestions}
                />
                {questions?.basicInfo?.questions.find((q) => q.index === 1)
                  ?.answer.length === 0 && t("field.fname")}{" "}
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 1)
                    ?.answer
                }
              </UpdateQuestionWrapper>

              {/* Last Name */}
              <UpdateQuestionWrapper className="last-name">
                <UpdateQuestion
                  key={JSON.stringify(questions)}
                  section="basicInfo"
                  index={2}
                  title="Edit Last Name"
                  questions={questions}
                  setQuestions={setQuestions}
                />
                {questions?.basicInfo?.questions.find((q) => q.index === 2)
                  ?.answer.length === 0 && t("field.lname")}
                {" " +
                  questions?.basicInfo?.questions.find((q) => q.index === 2)
                    ?.answer}
              </UpdateQuestionWrapper>
              <br />
              {/* Title */}
              <UpdateQuestionWrapper className="title">
                <UpdateQuestion
                  key={JSON.stringify(questions)}
                  section="basicInfo"
                  index={3}
                  title="Edit Title"
                  questions={questions}
                  setQuestions={setQuestions}
                />
                <SubSectionHeading>
                  {questions?.basicInfo?.questions.find((q) => q.index === 3)
                    ?.answer.length === 0 && t("field.title")}
                  {
                    questions?.basicInfo?.questions.find((q) => q.index === 3)
                      ?.answer
                  }
                </SubSectionHeading>
              </UpdateQuestionWrapper>
            </div>

            <br />

            {/* Address */}
            <UpdateQuestionWrapper
              className="address"
              margin="2px"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 8)
                  ?.removed
              }
            >
              <EnvironmentOutlined />{" "}
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={8}
                title="Edit Address"
                questions={questions}
                setQuestions={setQuestions}
              />
              <span>
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 8)
                    ?.answer
                }
              </span>
            </UpdateQuestionWrapper>

            {/* Phone */}
            <UpdateQuestionWrapper
              className="phone"
              margin="2px"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 9)
                  ?.removed
              }
            >
              <PhoneOutlined />{" "}
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={9}
                title="Edit Phone Number"
                questions={questions}
                setQuestions={setQuestions}
              />
              <span>
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 9)
                    ?.answer
                }
              </span>
            </UpdateQuestionWrapper>

            {/* Email */}
            <UpdateQuestionWrapper
              className="email"
              margin="2px"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 10)
                  ?.removed
              }
            >
              <MailOutlined />{" "}
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={10}
                title="Edit Email"
                questions={questions}
                setQuestions={setQuestions}
              />
              <span>
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 10)
                    ?.answer
                }
              </span>
            </UpdateQuestionWrapper>

            {/* LinkedIn */}
            <UpdateQuestionWrapper
              className="linkedin"
              margin="2px"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 11)
                  ?.removed
              }
            >
              <LinkedinOutlined />{" "}
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={11}
                title="Edit Linkedin profile"
                questions={questions}
                setQuestions={setQuestions}
              />
              <span>
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 11)
                    ?.answer
                }
              </span>
            </UpdateQuestionWrapper>

            {/* Website */}
            <UpdateQuestionWrapper
              className="website"
              margin="2px 0 20px 0"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 12)
                  ?.removed
              }
            >
              <GlobalOutlined />{" "}
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={12}
                title="Edit Website"
                questions={questions}
                setQuestions={setQuestions}
              />
              <span>
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 12)
                    ?.answer
                }
              </span>
            </UpdateQuestionWrapper>

            {/* Skills */}
            <UpdateQuestionWrapper
              className="skill"
              removed={
                questions?.skills?.questions.find((q) => q.index === 1000)
                  ?.removed
              }
            >
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="skills"
                index={1000}
                title="Edit Skill's"
                questions={questions}
                setQuestions={setQuestions}
              />
              {
                <>
                  <SectionHeading activeColor={activeColor}>{t("section.skills")}</SectionHeading>
                  <Space wrap>
                    {questions?.skills?.questions
                      .find((q) => q.index === 1000)
                      ?.answer.split(",")
                      .map((skill) => {
                        return skill ? (
                          <Tag icon={<CaretRightOutlined />}>
                            {skill}
                          </Tag>
                        ) : null;
                      })}
                  </Space>
                </>
              }
            </UpdateQuestionWrapper>

            {/* Language Skills */}
            <UpdateQuestionWrapper
              className="side-menu"
              removed={
                questions?.languages?.questions.find((q) => q.index === 2000)
                  ?.removed
              }
            >
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="languages"
                index={2000}
                title="Edit Language Skills"
                questions={questions}
                setQuestions={setQuestions}
              />
              {
                <>
                  <SectionHeading activeColor={activeColor}>{t("section.languageSkills")}</SectionHeading>
                  <Space direction="vertical">
                    {questions?.languages?.questions
                      .find((q) => q.index === 2000)
                      ?.answer.split(",")
                      .map((language, idx) => {
                        return language ? (
                          <span
                            key={language}
                            className="skills-name"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {language}
                            <br />
                            {questions?.languages?.questions.find(
                              (q) => q.index === 2000 + 2 + idx
                            )?.isLanguageRating && (
                              <LangRating
                                rating={
                                  questions.languages.questions.find(
                                    (q) => q.index === 2000 + 2 + idx
                                  )?.answer
                                }
                                options={
                                  questions.languages.questions.find(
                                    (q) => q.index === 2000 + 2 + idx
                                  )?.options
                                }
                              />
                            )}
                          </span>
                        ) : null;
                      })}
                  </Space>
                </>
              }
            </UpdateQuestionWrapper>

            {/* Interests */}
            <UpdateQuestionWrapper
              className="side-menu"
              removed={
                questions?.interests?.questions.find((q) => q.index === 3000)
                  ?.removed
              }
            >
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="interests"
                index={3000}
                title="Edit Interests"
                questions={questions}
                setQuestions={setQuestions}
              />
              {
                <>
                  <SectionHeading activeColor={activeColor}>{t("section.interests")}</SectionHeading>
                  <Space wrap>
                    {questions?.interests?.questions
                      .find((q) => q.index === 3000)
                      ?.answer.split(",")
                      .map((interest) => {
                        return interest ? (
                          <Tag icon={<CaretRightOutlined />}>
                            {interest}
                          </Tag>
                        ) : null;
                      })}
                  </Space>
                </>
              }
            </UpdateQuestionWrapper>
          </div>
        </div>

        <div className="content" style={{ padding: "40px", minHeight: "34.3cm", marginTop: "20px" }}>
          {/* Profile Summary */}
          <UpdateQuestionWrapper
            className="info-profile"
            removed={
              questions?.profileSummary?.questions.find((q) => q.index === 4000)
                ?.removed
            }
            display="block"
          >
            <Spin spinning={isProfileAILoading}>
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="profileSummary"
                index={4000}
                title="Edit Profile Summary"
                questions={questions}
                setQuestions={setQuestions}
                AIField={true}
                isLoading={isProfileAILoading}
                setIsLoading={setIsProfileAILoading}
              />
              <SectionHeading activeColor={activeColor}>
                {t("section.profileSummary")}
              </SectionHeading>
              <div className="profile-content">
                <p>
                  {
                    questions?.profileSummary?.questions.find((q) => q.index === 4000)
                      ?.answer
                  }
                </p>
              </div>
            </Spin>
            <SimpleDivider/>
          </UpdateQuestionWrapper>

          {/* Work Experience */}
          <div className="info-profile">
            <UpdateSectionWrapper
              removed={questions["workExperience"]?.removed}
            >
              <UpdateSection
                section={"workExperience"}
                questions={questions}
                setQuestions={setQuestions}
              />
              <Spin spinning={isWorkAILoading}>
                <SectionHeading activeColor={activeColor}>
                  {t("section.workExperience")}
                </SectionHeading>
                <div className="info-experience">
                  {
                    // resumeSelector?.workExp?.map((workExp, idx) => (
                    groupedExperience &&
                      Object.keys(groupedExperience).map((group) => {
                        return (
                          <UpdateItemWrapper keys={group}>
                            <UpdateItem
                              section={"workExperience"}
                              questions={questions}
                              setQuestions={setQuestions}
                              totalGroups={Object.keys(groupedExperience).length}
                              group={group}
                              totalItems={groupedExperience[group].length}
                            />
                            <div className="experience-content">
                              <div className="experience-content more-info">
                                <Row justify={"space-between"} align={"top"}>
                                  <Col>
                                    <Row justify={"center"} align={"middle"}>
                                      <Col>
                                        <UpdateQuestionWrapper className="info-position">
                                          <UpdateQuestion
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
                                        </UpdateQuestionWrapper>
                                      </Col>
                                      <Col>{" - "}</Col>
                                      <Col>
                                        <UpdateQuestionWrapper className="info-company">
                                          <UpdateQuestion
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
                                        </UpdateQuestionWrapper>
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
                                      <UpdateQuestionWrapper className="info-position">
                                        <UpdateQuestion
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
                                      </UpdateQuestionWrapper>
                                    </span>
                                    <span>{" - "}</span>
                                    <span>
                                      <UpdateQuestionWrapper className="info-position">
                                        <UpdateQuestion
                                          key={JSON.stringify(questions)}
                                          section="workExperience"
                                          index={
                                            groupedExperience[group][4].index
                                          }
                                          title="Edit Profile Summary"
                                          questions={questions}
                                          setQuestions={setQuestions}
                                        />
                                        {groupedExperience[group][4].answer}
                                      </UpdateQuestionWrapper>
                                    </span>
                                  </Col>
                                </Row>
                              </div>
                              <div className="work-description">
                                <p>
                                  {
                                    <UpdateQuestionWrapper className="info-position">
                                      <UpdateQuestion
                                        key={JSON.stringify(questions)}
                                        section="workExperience"
                                        index={
                                          groupedExperience[group][5].index
                                        }
                                        title="Edit Profile Summary"
                                        questions={questions}
                                        setQuestions={setQuestions}
                                        AIField={true}
                                        isLoading={isWorkAILoading}
                                        setIsLoading={setIsWorkAILoading}
                                        AIType="workSummary"
                                      />
                                      &bull;{" "}
                                      {groupedExperience[group][5].answer}
                                    </UpdateQuestionWrapper>
                                  }
                                </p>
                              </div>
                            </div>
                          </UpdateItemWrapper>
                        );
                      })
                  }
                </div>
                <SimpleDivider/>
              </Spin>
            </UpdateSectionWrapper>
          </div>

          {/* Education */}
          <UpdateSectionWrapper removed={questions["education"]?.removed}>
            <UpdateSection
              section={"education"}
              questions={questions}
              setQuestions={setQuestions}
            />
            <SectionHeading activeColor={activeColor}>
              {t("section.education")}
            </SectionHeading>
            <div className="info-education">
              {groupedEducation &&
                Object.keys(groupedEducation).map((group) => {
                  return (
                    <UpdateItemWrapper keys={group}>
                      <UpdateItem
                        section={"education"}
                        questions={questions}
                        setQuestions={setQuestions}
                        totalGroups={Object.keys(groupedEducation).length}
                        group={group}
                        totalItems={groupedEducation[group].length}
                      />
                      <div className="education-content">
                        <div className="education-content more-info">
                          <Row justify={"space-between"} align={"top"}>
                            <Col>
                              <Row justify={"start"} align={"middle"}>
                                <Col>
                                  <UpdateQuestionWrapper className="info-position">
                                    <UpdateQuestion
                                      key={JSON.stringify(questions)}
                                      section="education"
                                      index={groupedEducation[group][1].index}
                                      title="Edit Profile Summary"
                                      questions={questions}
                                      setQuestions={setQuestions}
                                    />
                                    {groupedEducation[group][1].answer}
                                  </UpdateQuestionWrapper>
                                </Col>
                                <Col>
                                  <UpdateQuestionWrapper className="info-college">
                                    <UpdateQuestion
                                      key={JSON.stringify(questions)}
                                      section="education"
                                      index={groupedEducation[group][2].index}
                                      title="Edit Profile Summary"
                                      questions={questions}
                                      setQuestions={setQuestions}
                                    />
                                    {groupedEducation[group][2].answer && " - "}{" "}
                                    {groupedEducation[group][2].answer}
                                  </UpdateQuestionWrapper>
                                </Col>
                              </Row>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "start",
                                  alignItems: "end",
                                }}
                              >
                                <UpdateQuestionWrapper
                                  style={{
                                    width: "fit-content",
                                    paddingY: 0,
                                  }}
                                >
                                  <UpdateQuestion
                                    key={JSON.stringify(questions)}
                                    section="education"
                                    index={groupedEducation[group][3].index}
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
                                </UpdateQuestionWrapper>
                                <UpdateQuestionWrapper>
                                  <UpdateQuestion
                                    key={JSON.stringify(questions)}
                                    section="education"
                                    index={groupedEducation[group][0].index}
                                    title="Edit Profile Summary"
                                    questions={questions}
                                    setQuestions={setQuestions}
                                  />
                                  {groupedEducation[group][0].answer && ","}{" "}
                                  <span style={{ fontStyle: "italic" }}>
                                    {groupedEducation[group][0].answer}
                                  </span>
                                </UpdateQuestionWrapper>
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
                                <UpdateQuestionWrapper className="info-position">
                                  <UpdateQuestion
                                    key={JSON.stringify(questions)}
                                    section="education"
                                    index={groupedEducation[group][4].index}
                                    title="Edit Profile Summary"
                                    questions={questions}
                                    setQuestions={setQuestions}
                                  />
                                  {groupedEducation[group][4].answer}
                                </UpdateQuestionWrapper>
                              </span>
                              <span>{" - "}</span>
                              <span>
                                <UpdateQuestionWrapper
                                  style={{ width: "auto" }}
                                >
                                  <UpdateQuestion
                                    key={JSON.stringify(questions)}
                                    section="education"
                                    index={groupedEducation[group][5].index}
                                    title="Edit Profile Summary"
                                    questions={questions}
                                    setQuestions={setQuestions}
                                  />
                                  {groupedEducation[group][5].answer}
                                </UpdateQuestionWrapper>
                              </span>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </UpdateItemWrapper>
                  );
                })}
            </div>
            <SimpleDivider/>
          </UpdateSectionWrapper>

          {/* Certificates */}
          <UpdateQuestionWrapper
            removed={
              questions?.certifications?.questions.find((q) => q.index === 7000)
                ?.removed
            }
            display="block"
          >
            <UpdateQuestion
              key={JSON.stringify(questions)}
              section="certifications"
              index={7000}
              title="Edit Certificates"
              questions={questions}
              setQuestions={setQuestions}
            />{" "}
            {
              <>
                <SectionHeading activeColor={activeColor}>
                  {t("section.certificates")}
                </SectionHeading>
                <br />
                <Space wrap={true}>
                  {questions?.certifications?.questions
                    .find((q) => q.index === 7000)
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
            <SimpleDivider/>
          </UpdateQuestionWrapper>

          {/* Awards */}
          <UpdateQuestionWrapper
            className="awards"
            removed={
              questions?.awards?.questions.find((q) => q.index === 8000)
                ?.removed
            }
            display="block"
          >
            <UpdateQuestion
              section="awards"
              index={8000}
              title="Edit Awards"
              questions={questions}
              setQuestions={setQuestions}
            />
            <SectionHeading activeColor={activeColor}>
              {t("section.awards")}
            </SectionHeading>
            <div className="awards-content">
              <Space wrap>
                {questions?.awards?.questions
                  .find((q) => q.index === 8000)
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
            <SimpleDivider/>
          </UpdateQuestionWrapper>

          {/* Projects */}
          <div className="info-project">
            <UpdateSectionWrapper removed={questions["projects"]?.removed}>
              <UpdateSection
                section={"projects"}
                questions={questions}
                setQuestions={setQuestions}
              />
              <SectionHeading activeColor={activeColor}>
                {t("section.projects")}
              </SectionHeading>
              <div className="info-project">
                {groupedProject &&
                  Object.keys(groupedProject).map((group) => {
                    return (
                      <UpdateItemWrapper keys={group}>
                        <UpdateItem
                          section={"projects"}
                          questions={questions}
                          setQuestions={setQuestions}
                          group={group}
                        />
                        <div className="project-content">
                          <div className="project-content more-info">
                            <Row justify={"space-between"} align={"top"}>
                              <Col>
                                <Row justify={"center"} align={"middle"}>
                                  <Col>
                                    <UpdateQuestionWrapper className="info-position">
                                      <UpdateQuestion
                                        key={JSON.stringify(questions)}
                                        section="projects"
                                        index={groupedProject[group][0].index}
                                        title="Edit Profile Summary"
                                        questions={questions}
                                        setQuestions={setQuestions}
                                      />
                                      <SubSectionHeading>
                                        {groupedProject[group][0].answer}
                                      </SubSectionHeading>
                                    </UpdateQuestionWrapper>
                                    <span>
                                      {groupedProject[group][1].answer && " | "}
                                      <UpdateQuestionWrapper className="info-position">
                                        <UpdateQuestion
                                          key={JSON.stringify(questions)}
                                          section="projects"
                                          index={groupedProject[group][1].index}
                                          title="Edit Profile Summary"
                                          questions={questions}
                                          setQuestions={setQuestions}
                                        />
                                        <a
                                          style={{ fontStyle: "italic" }}
                                          target="_blank"
                                          rel="noreferrer"
                                          href={
                                            groupedProject[group][1].answer[
                                              lang
                                            ]
                                          }
                                        >
                                          {
                                            groupedProject[group][1].answer[
                                              lang
                                            ]
                                          }
                                        </a>
                                      </UpdateQuestionWrapper>
                                    </span>
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
                                  <UpdateQuestionWrapper className="info-position">
                                    <UpdateQuestion
                                      key={JSON.stringify(questions)}
                                      section="projects"
                                      index={groupedProject[group][3].index}
                                      title="Edit Profile Summary"
                                      questions={questions}
                                      setQuestions={setQuestions}
                                    />
                                    {groupedProject[group][3].answer}
                                  </UpdateQuestionWrapper>
                                </span>
                                <span>{" - "}</span>
                                <span>
                                  <UpdateQuestionWrapper className="info-position">
                                    <UpdateQuestion
                                      key={JSON.stringify(questions)}
                                      section="projects"
                                      index={groupedProject[group][4].index}
                                      title="Edit Profile Summary"
                                      questions={questions}
                                      setQuestions={setQuestions}
                                    />
                                    {groupedProject[group][4].answer}
                                  </UpdateQuestionWrapper>
                                </span>
                              </Col>
                            </Row>
                          </div>
                          <div className="college-content">
                            <UpdateQuestionWrapper className="info-position">
                              <UpdateQuestion
                                key={JSON.stringify(questions)}
                                section="projects"
                                index={groupedProject[group][2].index}
                                title="Edit Profile Summary"
                                questions={questions}
                                setQuestions={setQuestions}
                              />
                              &bull; {groupedProject[group][2].answer}
                            </UpdateQuestionWrapper>
                          </div>
                        </div>
                      </UpdateItemWrapper>
                    );
                  })}
              </div>
            </UpdateSectionWrapper>
          </div>
        </div>
      </div>
    );
  }
);

export default Resume;
