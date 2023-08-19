import styled from "styled-components";

const SectionHeading = styled.h4`
  color: ${(props) =>
    props.activeColor ? props.activeColor : "black"};
`;

export { SectionHeading };
