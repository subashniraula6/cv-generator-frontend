import { styled } from "styled-components";

const AstroDivider = styled.div`
    width:400px; 
    max-width: 100%;
    position:relative;
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 5%;
        right: 5%;
        width: 90%;
        height: 1px;
        background-image: linear-gradient(to right, transparent, rgb(48,49,51), transparent);
    }
    &:after {
        content: "";
        position: absolute;
        z-index: 1;
        top: -7px;
        left: calc(50% - 7px);
        width: 14px;
        height: 14px;
        transform: rotate(45deg);
        background-color: white;
        border-bottom: 1px solid rgb(48,49,51);
        border-right: 1px solid rgb(48,49,51);
    }
`

export default AstroDivider;
