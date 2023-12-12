import styled from "styled-components";

const FormWrapper = styled.div`
    box-shadow: ${({ phoneMode, showResume }) =>
      (phoneMode && !showResume) ? "none" : "rgba(0, 0, 0, 0.16) 0px 1px 4px;"} 
    display: ${({ phoneMode, showResume }) =>
      !phoneMode || !showResume ? "flex" : "none"};
    flex-direction: column;
    width: 400px;
    min-width: 350px;
    padding: 20px;
    margin: 15px;
    height: 28rem;
`;

const ResumeWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin: 15px;
`;

export { ResumeWrapper, FormWrapper };
