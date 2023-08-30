import styled from 'styled-components';

const UpdateSectionWrapper = styled.div`
    padding: 2px;
    margin: 0 0 20px 0;
    width: 100%;
    display: ${(props) =>
        props.removed ? "none" : "block"};
    position: relative;
    &:hover {
        outline: 2px solid grey;
        outline-radius: 5px;
        background-color: rgb(255,255,255); /* Fallback color */
        background-color: rgba(255,255,255,0.6); /* Black w/ opacity */
    }
    &:hover .manage-section {
        display: inline;
    }
`

export default UpdateSectionWrapper