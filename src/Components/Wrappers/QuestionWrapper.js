import styled from "styled-components";

const QuestionWrapper = styled.div`
  height: 200px;
  display: ${(props) =>
    props.currentQuestionIdx === props.questionIdx ? "block" : "none"};
`;

export { QuestionWrapper };
