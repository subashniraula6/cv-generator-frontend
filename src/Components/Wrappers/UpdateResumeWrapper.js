import styled from 'styled-components';

const UpdateResumeWrapper = styled.div`
    padding: 0;
    margin: 10px 0;
    width: 100%;
    position: relative;
    &:hover {
        background: #dad7d7;
        -webkit-filter: invert(100%);
        filter: invert(100%);
        background-color: rgb(255,255,255); /* Fallback color */
        background-color: rgba(255,255,255,0.6); /* Black w/ opacity */
    }
    &:hover .manage-section {
        display: inline;
    }
`

export default UpdateResumeWrapper