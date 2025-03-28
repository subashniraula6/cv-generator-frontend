import styled from 'styled-components';

const UpdateItemWrapper = styled.div`
    padding: 2px;
    margin: 10px 0;
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
    &:hover .manage-item {
        display: inline;
    }
`

export default UpdateItemWrapper