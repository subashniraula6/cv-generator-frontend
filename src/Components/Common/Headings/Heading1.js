import styled from "styled-components";

const Heading1 = styled.span`
    text-transform:uppercase;
    ${({border}) => border==="right" ? "border-top": "border-bottom"}: 0.2rem solid ${({activeColor}) => activeColor};
    border-image: linear-gradient(to ${({border}) => border}, ${({activeColor}) => activeColor} 50%, transparent 50%) 100% 1;
`;

export { Heading1 };
