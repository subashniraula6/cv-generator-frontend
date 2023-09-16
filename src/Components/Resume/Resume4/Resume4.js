import { Avatar, Space, Spin, Tag } from "antd";
import { useLanguage } from "../../../context/Language";
import UpdateQuestion from "../../Common/UpdateQuestion";
import UpdateQuestionWrapper from "../../Wrappers/UpdateQuestionWrapper";
import "./Resume4.css";
import { SectionHeading } from "../../Wrappers/SectionHeading";
import UpdateSection from "../../Common/UpdateSection";
import UpdateSectionWrapper from "../../Wrappers/UpdateSectionWrapper";
import UpdateItemWrapper from "../../Wrappers/UpdateItemWrapper";
import UpdateItem from "../../Common/UpdateItem";
import { SubSectionHeading } from "../../Wrappers/SubSectionHeading";
import Divider from "../../Common/Dividers/Divider";
import {
  CheckCircleOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LangRating from "../../Common/LangRating/LangRating";
import { Heading1 } from "../../Common/Headings/Heading1";
// import ArrowDown from "../../Common/Dividers/ArrowDown";

export default function Resume2({
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
}) {
  const { language: lang, t } = useLanguage();
  const pictureWrapperStyle = {
    width: "fit-content",
  };
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:400,300,700"
        rel="stylesheet"
        type="text/css"
      />
      <div className="resume-container div-flex-4">
        {/* left start */}
        <div className="div-left-4">
          <div className="header4 div-col" style={{ maxWidth: "1450px" }}>
            <div className="picture">
              {/* Picture */}
              <UpdateQuestionWrapper
                className="picture"
                display={"block"}
                style={pictureWrapperStyle}
                removed={
                  questions?.basicInfo?.questions.find((q) => q.index === 5)
                    ?.removed
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
                  size={120}
                  icon={<UserOutlined />}
                  src={
                    questions?.basicInfo?.questions.find((q) => q.index === 5)
                      ?.answer
                  }
                />
              </UpdateQuestionWrapper>
            </div>
            <div className="full-name">
              {/* First Name */}
              <span className="first-name">
                <UpdateQuestionWrapper className="first-name">
                  <UpdateQuestion
                    key={JSON.stringify(questions)}
                    section="basicInfo"
                    index={1}
                    title="Edit First Name"
                    questions={questions}
                    setQuestions={setQuestions}
                  />
                  <Heading1 border={"right"} activeColor={activeColor}>
                    {questions?.basicInfo?.questions.find((q) => q.index === 1)
                      ?.answer.length === 0 && t("field.fname")}{" "}
                    {
                      questions?.basicInfo?.questions.find((q) => q.index === 1)
                        ?.answer
                    }
                  </Heading1>
                </UpdateQuestionWrapper>
              </span>
              {/* Last Name */}
              <span className="last-name">
                <UpdateQuestionWrapper className="last-name">
                  <UpdateQuestion
                    key={JSON.stringify(questions)}
                    section="basicInfo"
                    index={2}
                    title="Edit Last Name"
                    questions={questions}
                    setQuestions={setQuestions}
                  />
                  <Heading1 border={"left"} activeColor={activeColor}>
                    {questions?.basicInfo?.questions.find((q) => q.index === 2)
                      ?.answer.length === 0 && t("field.lname")}
                    {" " +
                      questions?.basicInfo?.questions.find((q) => q.index === 2)
                        ?.answer}
                  </Heading1>
                </UpdateQuestionWrapper>
              </span>
              <br />
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
          </div>
          <UpdateQuestionWrapper
            className="info-profile"
            removed={
              questions?.profileSummary?.questions.find((q) => q.index === 8000)
                ?.removed
            }
            display="block"
          >
            <Spin spinning={isProfileAILoading}>
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="profileSummary"
                index={8000}
                title="Edit Profile Summary"
                questions={questions}
                setQuestions={setQuestions}
                AIField={true}
                isLoading={isProfileAILoading}
                setIsLoading={setIsProfileAILoading}
              />
              <SectionHeading activeColor={activeColor}>
                <span className="position section__title">
                  {t("section.profileSummary")} {": "}
                </span>
              </SectionHeading>
              <span className="profile-content">
                {
                  questions?.profileSummary?.questions.find((q) => q.index === 8000)
                    ?.answer
                }
              </span>
            </Spin>
          </UpdateQuestionWrapper>
          <UpdateSectionWrapper removed={questions["workExperience"]?.removed}>
            <div className="section">
              <UpdateSection
                section={"workExperience"}
                questions={questions}
                setQuestions={setQuestions}
              />
              <Spin spinning={isWorkAILoading}>
                <SectionHeading activeColor={activeColor}>
                  <div className="section__title">
                    {t("section.workExperience")}
                  </div>
                </SectionHeading>
                <div className="section__list">
                  {groupedExperience &&
                    Object.keys(groupedExperience).map((group) => {
                      return (
                        <UpdateItemWrapper keys={group}>
                          <UpdateItem
                            section={"workExperience"}
                            questions={questions}
                            setQuestions={setQuestions}
                            group={group}
                          />
                          <div className="section__list-item">
                            <div className="left">
                              <div className="name">
                                <UpdateQuestionWrapper className="info-company">
                                  <UpdateQuestion
                                    key={JSON.stringify(questions)}
                                    section="workExperience"
                                    index={groupedExperience[group][0].index}
                                    title="Edit Profile Summary"
                                    questions={questions}
                                    setQuestions={setQuestions}
                                  />

                                  {groupedExperience[group][0].answer}
                                </UpdateQuestionWrapper>
                              </div>
                              <div className="duration">
                                <span>
                                  <UpdateQuestionWrapper className="info-position">
                                    <UpdateQuestion
                                      key={JSON.stringify(questions)}
                                      section="workExperience"
                                      index={groupedExperience[group][3].index}
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
                                      index={groupedExperience[group][4].index}
                                      title="Edit Profile Summary"
                                      questions={questions}
                                      setQuestions={setQuestions}
                                    />
                                    {groupedExperience[group][4].answer}
                                  </UpdateQuestionWrapper>
                                </span>
                              </div>
                            </div>
                            <div className="right">
                              <div className="name">
                                <UpdateQuestionWrapper className="info-position">
                                  <UpdateQuestion
                                    key={JSON.stringify(questions)}
                                    section="workExperience"
                                    index={groupedExperience[group][2].index}
                                    title="Edit Profile Summary"
                                    questions={questions}
                                    setQuestions={setQuestions}
                                  />
                                  {groupedExperience[group][2].answer}
                                </UpdateQuestionWrapper>
                              </div>
                              <div className="desc">
                                <UpdateQuestionWrapper className="info-position">
                                  <UpdateQuestion
                                    key={JSON.stringify(questions)}
                                    section="workExperience"
                                    index={groupedExperience[group][5].index}
                                    title="Edit Profile Summary"
                                    questions={questions}
                                    setQuestions={setQuestions}
                                    AIField={true}
                                    isLoading={isWorkAILoading}
                                    setIsLoading={setIsWorkAILoading}
                                    AIType="workSummary"
                                  />
                                  {groupedExperience[group][5].answer}
                                </UpdateQuestionWrapper>
                              </div>
                            </div>
                          </div>
                        </UpdateItemWrapper>
                      );
                    })}
                </div>
              </Spin>
            </div>
            <Divider />
          </UpdateSectionWrapper>

          {/* Education */}
          <UpdateSectionWrapper removed={questions["education"]?.removed}>
            <div className="section">
              <UpdateSection
                section={"education"}
                questions={questions}
                setQuestions={setQuestions}
              />
              <SectionHeading activeColor={activeColor}>
                <div className="section__title">{t("section.education")}</div>
              </SectionHeading>
              <div className="section__list">
                {groupedEducation &&
                  Object.keys(groupedEducation).map((group) => {
                    return (
                      <UpdateItemWrapper keys={group}>
                        <UpdateItem
                          section={"education"}
                          questions={questions}
                          setQuestions={setQuestions}
                          group={group}
                        />
                        <div className="section__list-item">
                          <div className="left">
                            <div className="name">
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
                            </div>
                            <div className="addr">
                              <UpdateQuestionWrapper>
                                <UpdateQuestion
                                  key={JSON.stringify(questions)}
                                  section="education"
                                  index={groupedEducation[group][0].index}
                                  title="Edit Profile Summary"
                                  questions={questions}
                                  setQuestions={setQuestions}
                                />
                                <span style={{ fontStyle: "italic" }}>
                                  {groupedEducation[group][0].answer}
                                </span>
                              </UpdateQuestionWrapper>
                            </div>
                            <div className="duration">
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
                            </div>
                          </div>
                          <div className="right">
                            <div className="name">
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
                            </div>
                            <div className="desc">
                              <UpdateQuestionWrapper className="info-college">
                                <UpdateQuestion
                                  key={JSON.stringify(questions)}
                                  section="education"
                                  index={groupedEducation[group][2].index}
                                  title="Edit Profile Summary"
                                  questions={questions}
                                  setQuestions={setQuestions}
                                />
                                {groupedEducation[group][2].answer}
                              </UpdateQuestionWrapper>
                            </div>
                          </div>
                        </div>
                      </UpdateItemWrapper>
                    );
                  })}
              </div>
            </div>
            <Divider />
          </UpdateSectionWrapper>
          <UpdateSectionWrapper removed={questions["projects"]?.removed}>
            <div className="section">
              <UpdateSection
                section={"projects"}
                questions={questions}
                setQuestions={setQuestions}
              />
              <SectionHeading activeColor={activeColor}>
                <div className="section__title">{t("section.projects")}</div>
              </SectionHeading>
              <div className="section__list">
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
                        <div className="section__list-item">
                          <div className="name">
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
                          </div>
                          <div className="text">
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
            </div>
          </UpdateSectionWrapper>
        </div>
        {/* left end */}
        {/* right start */}
        <div className="div-right-4">
          <div className="details right-details-4">
            <div className="contact-info-4 div-col">
              {/* Address */}
              <UpdateQuestionWrapper
                className="address margin-3"
                removed={
                  questions?.basicInfo?.questions.find((q) => q.index === 8)
                    ?.removed
                }
              >
                <SectionHeading activeColor={activeColor}>
                  <span className="section__title ">
                    <EnvironmentOutlined /> {t("label.address")} {" "}
                  </span>
                </SectionHeading>
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

              {/* Email */}
              <UpdateQuestionWrapper
                className="email margin-3"
                removed={
                  questions?.basicInfo?.questions.find((q) => q.index === 10)
                    ?.removed
                }
              >
                <SectionHeading activeColor={activeColor}>
                  <span className="section__title ">
                    <MailOutlined /> {t("label.email")}:{" "}
                  </span>
                </SectionHeading>
                <span className="email-val">
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
                </span>
              </UpdateQuestionWrapper>
              {/* <span className="separator"></span> */}

              {/* Phone */}
              <UpdateQuestionWrapper
                className="phone margin-3"
                removed={
                  questions?.basicInfo?.questions.find((q) => q.index === 9)
                    ?.removed
                }
              >
                <SectionHeading activeColor={activeColor}>
                  <span className="phone">
                    <PhoneOutlined /> {t("label.phone")}:{" "}
                  </span>
                </SectionHeading>
                <UpdateQuestion
                  key={JSON.stringify(questions)}
                  section="basicInfo"
                  index={9}
                  title="Edit Phone Number"
                  questions={questions}
                  setQuestions={setQuestions}
                />
                <span className="phone-val">
                  {
                    questions?.basicInfo?.questions.find((q) => q.index === 9)
                      ?.answer
                  }
                </span>
              </UpdateQuestionWrapper>
              {/* <span className="separator"></span> */}

              {/* LinkedIn */}
              <UpdateQuestionWrapper
                className="linkedin margin-3"
                removed={
                  questions?.basicInfo?.questions.find((q) => q.index === 11)
                    ?.removed
                }
              >
                <SectionHeading activeColor={activeColor}>
                  <span className="linkedIn">
                    <LinkedinOutlined /> {t("label.linkedin")}:{" "}
                  </span>
                </SectionHeading>
                <UpdateQuestion
                  key={JSON.stringify(questions)}
                  section="basicInfo"
                  index={11}
                  title="Edit Linkedin profile"
                  questions={questions}
                  setQuestions={setQuestions}
                />
                <span className="linkedIn-val">
                  {
                    questions?.basicInfo?.questions.find((q) => q.index === 11)
                      ?.answer
                  }
                </span>
              </UpdateQuestionWrapper>

              {/* <span className="separator"></span> */}
              {/* Website */}
              <UpdateQuestionWrapper
                className="website margin-3"
                removed={
                  questions?.basicInfo?.questions.find((q) => q.index === 12)
                    ?.removed
                }
              >
                <SectionHeading activeColor={activeColor}>
                  <span className="linkedIn">
                    <GlobalOutlined /> {t("label.website")}:{" "}
                  </span>
                </SectionHeading>
                <UpdateQuestion
                  key={JSON.stringify(questions)}
                  section="basicInfo"
                  index={12}
                  title="Edit Website"
                  questions={questions}
                  setQuestions={setQuestions}
                />
                <span className="linkedIn-val">
                  {
                    questions?.basicInfo?.questions.find((q) => q.index === 12)
                      ?.answer
                  }
                </span>
              </UpdateQuestionWrapper>
            </div>
            <br />
            <br />
            {/* Interests */}
            <UpdateQuestionWrapper
              className="side-menu"
              removed={
                questions?.interests?.questions.find((q) => q.index === 3000)
                  ?.removed
              }
              display="block"
            >
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="interests"
                index={3000}
                title="Edit Interests"
                questions={questions}
                setQuestions={setQuestions}
              />
              <div className="section">
                <div className="section__title">
                  <SectionHeading activeColor={activeColor}>
                    <h4>{t("section.interests")}</h4>
                  </SectionHeading>
                </div>
                <div className="section__list">
                  <div className="section__list-item">
                    {questions?.interests?.questions
                      .find((q) => q.index === 3000)
                      ?.answer.split(",")
                      .map((interest) => {
                        return interest ? (
                          <Tag
                            color={"purple"}
                            icon={<CheckCircleOutlined />}
                            style={{ margin: "5px" }}
                          >
                            {interest}
                          </Tag>
                        ) : null;
                      })}
                  </div>
                </div>
              </div>
              <Divider />
            </UpdateQuestionWrapper>
            <br />
            {/* Language Skills */}
            <UpdateQuestionWrapper
              className="side-menu"
              removed={
                questions?.languages?.questions.find((q) => q.index === 2000)
                  ?.removed
              }
              display="block"
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
                  <div className="section__title">
                    <SectionHeading activeColor={activeColor}>
                      <h4>{t("section.languageSkills")}</h4>
                    </SectionHeading>
                  </div>
                  <Space wrap>
                    {questions?.languages?.questions
                      .find((q) => q.index === 2000)
                      ?.answer.split(",")
                      .map((language, idx) => {
                        return language ? (
                          <span
                            key={language}
                            className="language-name"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            &bull; {language}
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
                  <Divider />
                </>
              }
            </UpdateQuestionWrapper>
            <br />

            {/* Skill */}
            <UpdateQuestionWrapper
              className="skill"
              removed={
                questions?.skills?.questions.find((q) => q.index === 1000)
                  ?.removed
              }
              display="block"
            >
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="skills"
                index={1000}
                title="Edit Skill's"
                questions={questions}
                setQuestions={setQuestions}
              />
              <div className="section">
                <div className="section__title">
                  <SectionHeading activeColor={activeColor}>
                    <h4>{t("section.skills")}</h4>
                  </SectionHeading>
                </div>
                <div className="skills">
                  <Space wrap>
                    {questions?.skills?.questions
                      .find((q) => q.index === 1000)
                      ?.answer.split(",")
                      .map((skill) => {
                        return skill ? (
                          <Tag
                            color={activeColor}
                            icon={<CheckCircleOutlined />}
                          >
                            {skill}
                          </Tag>
                        ) : null;
                      })}
                  </Space>
                </div>
              </div>
              <Divider />
            </UpdateQuestionWrapper>
            <br />

            {/* Certificates */}
            <UpdateQuestionWrapper
              removed={
                questions?.certifications?.questions.find((q) => q.index === 5000)
                  ?.removed
              }
              display="block"
            >
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="certifications"
                index={5000}
                title="Edit Certificates"
                questions={questions}
                setQuestions={setQuestions}
              />
              <>
                <SectionHeading activeColor={activeColor}>
                  <div className="section__title">
                    {t("section.certificates")}
                  </div>
                </SectionHeading>
                <Space wrap={true}>
                  {questions?.certifications?.questions
                    .find((q) => q.index === 5000)
                    ?.answer.split(",")
                    .map((certificate) => {
                      return certificate ? (
                        <span
                          key={certificate}
                          className="certificate-name"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          &bull; {certificate}
                        </span>
                      ) : null;
                    })}
                </Space>
              </>
              <Divider />
            </UpdateQuestionWrapper>
            <br />
            {/* Awards */}
            <UpdateQuestionWrapper
              className="awards"
              removed={
                questions?.awards?.questions.find((q) => q.index === 4000)
                  ?.removed
              }
              display="block"
            >
              <div className="section">
                <UpdateQuestion
                  section="awards"
                  index={4000}
                  title="Edit Awards"
                  questions={questions}
                  setQuestions={setQuestions}
                />
                <SectionHeading activeColor={activeColor}>
                  <div className="section__title">{t("section.awards")}</div>
                </SectionHeading>
                <div className="awards-content">
                  <Space wrap>
                    {questions?.awards?.questions
                      .find((q) => q.index === 4000)
                      ?.answer?.split(",")
                      .map((award) => {
                        return award ? (
                          <span
                            key={award}
                            className="award-name"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            &bull; {award}
                          </span>
                        ) : null;
                      })}
                  </Space>
                </div>
              </div>
            </UpdateQuestionWrapper>
          </div>
        </div>
        {/* right end */}
      </div>
    </>
  );
}
