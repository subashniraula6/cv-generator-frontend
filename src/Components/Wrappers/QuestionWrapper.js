import styled from "styled-components";

const QuestionWrapper = styled.div`
  padding: 1em;
  background: papayawhip;
  margin: 10px;
  display: ${(props) =>
    props.currentQuestionIdx === props.questionIdx ? "block" : "none"};
`;

export { QuestionWrapper };
