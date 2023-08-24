import styled from 'styled-components';

const UpdateQuestionWrapper = styled.div`
    padding: 2px;
    margin: 10px 0;
    width: 100%;
    position: relative;
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