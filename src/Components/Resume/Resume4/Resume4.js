import { Space, Spin, Tag } from "antd";
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
import  Divider from "../../Common/Dividers/Divider";
import {
  CheckCircleOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import LangRating from "../../Common/LangRating/LangRating";
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
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:400,300,700"
        rel="stylesheet"
        type="text/css"
      />
      <div className="resume-container">
       
          {/* left start */}
          <div class="div-left ">
          <div
          className="header div-col"
          style={{  maxWidth: "1450px"  }}
        >
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
                {questions?.basicInfo?.questions.find((q) => q.index === 1)
                  ?.answer[lang].length === 0 && t("field.fname")}{" "}
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 1)
                    ?.answer[lang]
                }
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
                {questions?.basicInfo?.questions.find((q) => q.index === 2)
                  ?.answer[lang].length === 0 && t("field.lname")}
                {" " +
                  questions?.basicInfo?.questions.find((q) => q.index === 2)
                    ?.answer[lang]}
              </UpdateQuestionWrapper>
            </span>
          </div>
          </div>
           <div className="about">
            <span className="desc">
              <UpdateQuestionWrapper
                className="info-profile"
                removed={
                  questions?.basicInfo?.questions.find((q) => q.index === 53)
                    ?.removed
                }
                display="block"
              >
                <Spin spinning={isProfileAILoading}>
                  <UpdateQuestion
                    key={JSON.stringify(questions)}
                    section="basicInfo"
                    index={53}
                    title="Edit Profile Summary"
                    questions={questions}
                    setQuestions={setQuestions}
                    AIField={true}
                    isLoading={isProfileAILoading}
                    setIsLoading={setIsProfileAILoading}
                  />
                   <SectionHeading activeColor={activeColor}>
                  <span className="position section__title">
                    {t("section.profileSummary")}
                  </span>
                  </SectionHeading>
                  <span className="profile-content">
                    {
                      questions?.basicInfo?.questions.find(
                        (q) => q.index === 53
                      )?.answer[lang]
                    }
                  </span>
                </Spin>
              </UpdateQuestionWrapper>
            </span>
       
          </div>
          <UpdateSectionWrapper
              removed={questions["workExperience"]?.removed}
            >
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
                                  
                                    {groupedExperience[group][0].answer[lang]}
                                  </UpdateQuestionWrapper>
                                </div>
                                <div className="addr">San Fr, CA</div>
                                <div className="duration">
                                  <span>
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
                                      {groupedExperience[group][2].answer[lang]}
                                    </UpdateQuestionWrapper>
                                  </span>
                                  <span>{" - "}</span>
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
                                      {groupedExperience[group][3].answer[lang]}
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
                                      index={groupedExperience[group][1].index}
                                      title="Edit Profile Summary"
                                      questions={questions}
                                      setQuestions={setQuestions}
                                    />
                                    {groupedExperience[group][1].answer[lang]}
                                  </UpdateQuestionWrapper>
                                </div>
                                <div className="desc">
                                  <UpdateQuestionWrapper className="info-position">
                                    <UpdateQuestion
                                      key={JSON.stringify(questions)}
                                      section="workExperience"
                                      index={groupedExperience[group][4].index}
                                      title="Edit Profile Summary"
                                      questions={questions}
                                      setQuestions={setQuestions}
                                      AIField={true}
                                      isLoading={isWorkAILoading}
                                      setIsLoading={setIsWorkAILoading}
                                      AIType="workSummary"
                                    />
                                    {groupedExperience[group][4].answer[lang]}
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
              <Divider/>
            </UpdateSectionWrapper>
            <Divider/>
     
            <UpdateQuestionWrapper
              className="skill"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 13)
                  ?.removed
              }
              display="block"
            >
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={13}
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
                  {questions?.basicInfo?.questions
                    .find((q) => q.index === 13)
                    ?.answer[lang].split(",")
                    .map((skill) => {
                      return skill ? (
                        <div className="skills__item">
                          <div className="left">
                            <div className="name">{skill}</div>
                          </div>
                          <div className="right">
                            <input id="ck1" type="checkbox" checked />

                            <label for="ck1"></label>
                            <input id="ck2" type="checkbox" checked />

                            <label for="ck2"></label>
                            <input id="ck3" type="checkbox" />

                            <label for="ck3"></label>
                            <input id="ck4" type="checkbox" />
                            <label for="ck4"></label>
                            <input id="ck5" type="checkbox" />
                            <label for="ck5"></label>
                          </div>
                        </div>
                      ) : null;
                    })}
                </div>
              </div>
              <Divider/>
            </UpdateQuestionWrapper>
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
                                    {groupedEducation[group][3].answer[lang]}
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
                                    {groupedEducation[group][0].answer[lang]}
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
                                    {groupedEducation[group][4].answer[lang]}
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
                                    {groupedEducation[group][5].answer[lang]}
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
                                  {groupedEducation[group][1].answer[lang]}
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
                                  {groupedEducation[group][2].answer[lang]}
                                </UpdateQuestionWrapper>
                              </div>
                            </div>
                          </div>
                        </UpdateItemWrapper>
                      );
                    })}
                </div>
              </div>
              <Divider/>
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
                                  {groupedProject[group][0].answer[lang]}
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
                                &bull; {groupedProject[group][2].answer[lang]}
                              </UpdateQuestionWrapper>
                            </div>
                          </div>
                        </UpdateItemWrapper>
                      );
                    })}
                </div>
              </div>
              <Divider/>
            </UpdateSectionWrapper>
          </div>
          {/* left end */}
          {/* right start */}
          <div className="div-right width45">
             <div className="container">
          <div className="details">
          <div className="contact-info div-col  ">
            {/* Email */}
            <UpdateQuestionWrapper
              className="email margin-3"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 9)
                  ?.removed
              }
            >
              <SectionHeading activeColor={activeColor}>
              <span className="section__title " >
                <MailOutlined /> {t("label.email")}:{" "}
              </span>
              </SectionHeading>
              <span className="email-val">
                <UpdateQuestion
                  key={JSON.stringify(questions)}
                  section="basicInfo"
                  index={9}
                  title="Edit Email"
                  questions={questions}
                  setQuestions={setQuestions}
                />
                <span>
                  {
                    questions?.basicInfo?.questions.find((q) => q.index === 9)
                      ?.answer[lang]
                  }
                </span>
              </span>
            </UpdateQuestionWrapper>
            {/* <span className="separator"></span> */}

            {/* Phone */}

            <UpdateQuestionWrapper
              className="phone margin-3"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 8)
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
                index={8}
                title="Edit Phone Number"
                questions={questions}
                setQuestions={setQuestions}
              />
              <span className="phone-val">
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 8)
                    ?.answer[lang]
                }
              </span>
            </UpdateQuestionWrapper>
            {/* <span className="separator"></span> */}

            {/* LinkedIn */}
            <UpdateQuestionWrapper
              className="linkedin margin-3"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 10)
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
                index={10}
                title="Edit Linkedin profile"
                questions={questions}
                setQuestions={setQuestions}
              />
              <span className="linkedIn-val">
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 10)
                    ?.answer[lang]
                }
              </span>
            </UpdateQuestionWrapper>

            {/* <span className="separator"></span> */}
            {/* Website */}
            <UpdateQuestionWrapper
              className="website margin-3"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 11)
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
                index={11}
                title="Edit Website"
                questions={questions}
                setQuestions={setQuestions}
              />
              <span className="linkedIn-val">
                {
                  questions?.basicInfo?.questions.find((q) => q.index === 11)
                    ?.answer[lang]
                }
              </span>
            </UpdateQuestionWrapper>
          </div>

            {/* Education */}
          
            {/* Projects */}
         
            {/* Skills */}
         
            {/* Interests */}
            <UpdateQuestionWrapper
              className="side-menu"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 50)
                  ?.removed
              }
              display="block"
            >
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={50}
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
                    {questions?.basicInfo?.questions
                      .find((q) => q.index === 50)
                      ?.answer[lang].split(",")
                      .map((interest) => {
                        return interest ? (
                          <Tag color={"purple"} icon={<CheckCircleOutlined />}>
                            {interest}
                          </Tag>
                        ) : null;
                      })}
                  </div>
                </div>
              </div>
              <Divider/>
            </UpdateQuestionWrapper>
            <br />
            {/* Language Skills */}
            <UpdateQuestionWrapper
              className="side-menu"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 14)
                  ?.removed
              }
              display="block"
            >
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={14}
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
                    {questions?.basicInfo?.questions
                      .find((q) => q.index === 14)
                      ?.answer[lang].split(",")
                      .map((language, idx) => {
                        return language ? (
                          <span
                            key={language}
                            className="language-name"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            &bull; {language}
                            <br />
                            {questions?.basicInfo?.questions.find(
                              (q) => q.index === 14 + 2 + idx
                            )?.isLanguageRating && (
                              <LangRating
                                rating={
                                  questions.basicInfo.questions.find(
                                    (q) => q.index === 14 + 2 + idx
                                  )?.answer[lang]
                                }
                                lang={lang}
                                questions={questions}
                                setQuestions={setQuestions}
                                questionIdx={14 + 2 + idx}
                              />
                            )}
                          </span>
                        ) : null;
                      })}
                  </Space>
                  <Divider/>
                </>
              }
            </UpdateQuestionWrapper>
            <br />
            {/* Certificates */}
            <UpdateQuestionWrapper
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 51)
                  ?.removed
              }
              display="block"
            >
              <UpdateQuestion
                key={JSON.stringify(questions)}
                section="basicInfo"
                index={51}
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
                  {questions?.basicInfo?.questions
                    .find((q) => q.index === 51)
                    ?.answer[lang].split(",")
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
              <Divider/>
            </UpdateQuestionWrapper>
            <br />
            {/* Awards */}
            <UpdateQuestionWrapper
              className="awards"
              removed={
                questions?.basicInfo?.questions.find((q) => q.index === 52)
                  ?.removed
              }
              display="block"
            >
              <div className="section">
                <UpdateQuestion
                  section="basicInfo"
                  index={52}
                  title="Edit Awards"
                  questions={questions}
                  setQuestions={setQuestions}
                />
                <SectionHeading activeColor={activeColor}>
                  <div className="section__title">{t("section.awards")}</div>
                </SectionHeading>
                <div className="awards-content">
                  <Space wrap>
                    {questions?.basicInfo?.questions
                      .find((q) => q.index === 52)
                      ?.answer[lang]?.split(",")
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
          </div>
         {/* right end */}
       
         
        </div>
       
    
    </>
  );
}
