import styled from "styled-components";

const QuestionContainer = styled.div`
  display: ${(props) =>
    props.removed ? "none" : "block"};
`;

export { QuestionContainer };
