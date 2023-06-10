import { colors } from "../../styles/colors";
import styled from "styled-components";

export const BodyContainer = styled.div`
max-width: 1184px;
margin: 120px auto;
display:flex;
flex-wrap:wrap;
`

export const Header = styled.h1`
font-family: Inter, sans-serif;
font-size: 2em;
font-weight: 700;
width: 100%;
margin-bottom: 0;
padding-bottom: 32px;
border-bottom: 1px solid ${colors.textBlack}
`;

export const Link = styled.a`
color: ${colors.textBlack};
font-size: 1em;
font-family: Inter, sans-serif;
width: 100%;
margin-top: 32px;
`
