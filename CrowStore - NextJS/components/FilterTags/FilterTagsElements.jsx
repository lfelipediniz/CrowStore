import styled from "styled-components";

export const Filter = styled.div`
box-sizing: border-box;
margin: 1em auto 0;
width: calc(100% - (2 * 64px));
clear: both;
`;

export const Title = styled.p`
font-family: Inter, sans-serif;
font-size: 1em;
line-height: 1.5em;
box-sizing: border-box;
font-weight:500;
text-transform: uppercase;
float: left;
padding: 1px 6px 1px 0;
`;

export const TagList = styled.ul`
list-style: none;
padding-left: 0px;
`;

export const Tag = styled.li`
margin: 0 0.5em 0.5em 0;
float:left;
`;

export const Button = styled.button`
font-family: Inter, sans-serif;
font-size: 1em;
line-height: 1.5em;
box-sizing: border-box;
background-color: white;
padding: 1px 6px;
border: 1px solid black;
`;
