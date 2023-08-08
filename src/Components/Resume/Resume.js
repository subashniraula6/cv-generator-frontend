import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./Resume.module.css";
import { Layout, Space, Row, Col, Typography } from 'antd';
import {MailOutlined} from '@ant-design/icons'
const { Sider, Content } = Layout;

const Resume = forwardRef(({questions, setQuestions}, ref) => {
  const siderStyle = {
    color: '#fff',
    backgroundColor: '#3ba0e9',
    padding: '30px'
  };

  const contentStyle = {
  };
  
  return (
    <Layout>
      <Sider style={siderStyle} width={280}>
        <div className="info-header">
          <div className="name-style">
            <Typography.Title level={2}>{questions?.basicInfo?.questions[0].answer}</Typography.Title>
            <Typography.Title level={4}>{questions?.basicInfo?.questions[1].answer}</Typography.Title>
          </div>
          <div className="contact-info">
            {/* <small>
              <MailOutlined />
              <label className="contact-label">{resumeSelector?.basicInfo?.email?.value}</label>
            </small>
            <p>{resumeSelector?.basicInfo?.linkedIn?.value}</p>
            <p>{resumeSelector?.basicInfo?.github?.value}</p>
            <p>{resumeSelector?.basicInfo?.email?.value}</p> */}
            <p>{questions?.basicInfo?.questions.find(q => q.index===6)?.answer}</p>
          </div>
        </div>
      </Sider>
      <Content style={contentStyle}>
      <div style={{ padding: '40px' }}>
      <div className="info-profile">
        <h3>Profile Summary</h3>
          <div className="profile-content">
            <p>
            {questions?.basicInfo?.questions.find(q => q.index===18)?.answer}
            </p>
          </div>
        </div>
        <hr />
        <div>
          {
            // questions?.basicInfo?.questions[7].answer &&
            <>
              <h3>Skill's</h3>
              <Space>
              {
                questions?.basicInfo?.questions.find(q => q.index===8)?.answer.split(',').map(skill => (
                  <span className="skills-name" style={{whiteSpace: 'nowrap'}}>&bull; {skill}</span>
                ))
              }
              </Space>
            </>
          }
        </div>
        <div>
        {
            // questions?.basicInfo?.questions[8].answer &&
            <>
              <h3>Languages</h3>
              <Space>
              {
                questions?.basicInfo?.questions.find(q => q.index===9)?.answer.split(',').map(language => (
                  <span className="skills-name" style={{whiteSpace: 'nowrap'}}>&bull; {language}</span>
                ))
              }
              </Space>
            </>
        }
        </div>
        <div>
        {
            // questions?.basicInfo?.questions[8].answer &&
            <>
              <h3>Interests</h3>
              <Space>
              {
                questions?.basicInfo?.questions.find(q => q.index===12)?.answer.split(',').map(interest => (
                  <span className="skills-name" style={{whiteSpace: 'nowrap'}}>&bull; {interest}</span>
                ))
              }
              </Space>
            </>
        }
        </div>
        <hr />
        {
          // questions?.workExperience?.questions &&
          // <>
          //   <h3>Work Experience</h3>
          //   <div className="info-experience">
          //     {
          //       // resumeSelector?.workExp?.map((workExp, idx) => (
          //       <div className="experience-content" key={idx}>
          //         <div className="experience-content more-info">
          //           <Row justify={'space-between'}>
          //             <Col>
          //               <span>{questions?.workExperience?.questions[0].answer}</span>
          //               <span> - </span>
          //               <span>{questions?.workExperience?.questions[0].answer}</span>
          //               <span>{workExp?.location?.value}</span>
          //             </Col>
          //             <Col>
          //               <span>{workExp?.startDate?.value} - {workExp?.endDate?.value}</span>
          //             </Col>
          //           </Row>
          //           <div className="work-content">
          //             <p>{workExp?.description?.value}</p>
          //           </div>
          //         </div>
          //       </div>
          //     // ))
          //   }
          //   </div>
          // </>
        }
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

        <div className="info-education">
          <Typography.Title level={4}>Education</Typography.Title>
          <div className="education-content">
            {
              resumeSelector?.education?.map((education, idx) => (
                <div className="education-content more-info" key={idx}>
                  <Row justify={'space-between'}>
                    <Col>
                      <span>{education?.instituition?.value} {education?.location?.value}</span>
                    </Col>
                    <Col>
                      <span>{education?.startDate?.value} - {education?.endDate?.value}</span>
                    </Col>
                  </Row>
                  <div className="college-content">
                    <p>{education?.title?.value}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <hr />
        <div className="info-achievement">
          <Typography.Title level={4}>Achievements</Typography.Title>
          <div className="achievement-content">
            <Space>
              {
                resumeSelector?.achievement?.map((achievement, idx) => (
                  <div className="achievement-content more-info" key={idx}>
                    <Row justify={'space-between'}>
                      <Col>
                      <div>
                        <span>{achievement?.title?.value}</span>
                        <span>({achievement?.date?.value})</span>
                      </div>
                      <div>
                        <span>{achievement?.awarder?.value}</span>
                      </div>
                      </Col>
                    </Row>
                    <div className="achievement-content">
                      <p>{achievement?.description?.value}</p>
                    </div>
                  </div>
                ))
              }
            </Space>
          </div>
        </div> */}
      </div>
      </Content>
    </Layout>
  );
});

export default Resume;
