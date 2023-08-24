import styled from "styled-components";

const SectionWrapper = styled.div`
  display: ${(props) =>
    props.removed ? "none" : "block"};
`;

export { SectionWrapper };
