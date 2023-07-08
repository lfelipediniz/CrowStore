import styled from "styled-components";
import { colors } from "../../styles/colors";

export const BodyContainer = styled.div`
    max-width: 1184px;
    margin: 120px auto;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    background-color: ${colors.primary};

    * {    
        font-family: Inter, sans-serif;
        font-size: 1em;
        line-height: 1.5em;
        box-sizing: border-box;
    }
`
