import styled from "styled-components";

const SubSectionHeading = styled.span`
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.04rem;
  color: ${(props) =>
    props.activeColor ? props.activeColor : "black"};
`;

export { SubSectionHeading };
