import { colors } from "../../styles/colors";
import styled from "styled-components";

export const BodyContainer = styled.div`
    max-width: 1184px;
    margin: 120px auto;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 1080px) {
        flex-direction: column;
    }
`;

export const Header = styled.h1`
    font-size: 2em;
    font-weight: 700;
    width: 100%;
    margin-bottom: 0;
    padding-bottom: 32px;
    border-bottom: 1px solid ${colors.textBlack}
`;

export const Link = styled.a`
    color: ${colors.textBlack};
    width: 100%;
    margin: 32px 0;
`
