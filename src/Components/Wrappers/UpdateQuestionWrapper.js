import styled from 'styled-components';

const UpdateQuestionWrapper = styled.span`
    block-size: fit-content;
    ${({underline}) => underline ? "text-decoration: underline;" : null}
    padding: 2px;
    margin: ${({margin}) => margin ? margin: "0 0 20px 0"};
    width: 100%;
    position: relative;
    flex-wrap: wrap;
    overflow-wrap: anywhere;    
    display: ${(props) =>
    props.removed ? "none" : (props.display || "inline")};
    &:hover {
        outline: 2px solid grey;
        outline-radius: 5px;
        background-color: rgb(255,255,255); /* Fallback color */
        background-color: rgba(255,255,255,0.6); /* Black w/ opacity */
    }
    &:hover .manage-question {
        display: inline;
    }
`

export default UpdateQuestionWrapper