import styled from "styled-components";

const SectionHeading = styled.span`
  font-size: 14px;
  text-transform:uppercase;
  font-weight: bold;
  letter-spacing: 0.06rem;
  color: ${(props) =>
    props.activeColor ? props.activeColor : "black"};
`;

export { SectionHeading };
