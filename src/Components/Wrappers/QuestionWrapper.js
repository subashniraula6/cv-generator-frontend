import styled from "styled-components";

const QuestionWrapper = styled.div`
  display: ${(props) =>
    props.currentQuestionIdx === props.questionIdx ? "block" : "none"};
`;

export { QuestionWrapper };
