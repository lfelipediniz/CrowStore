import styled from "styled-components";
import { colors } from "../../styles/colors";
import bannerImage from "../../public/CrowStore/imgs/bannerJaqueta.png";


export const HeroContainer = styled.div`
  display: grid;
  place-items: center;
  overflow: hidden;
`;

export const HeroWrapper = styled.div`
display: flex;
  min-height: 700px;
`;

export const Banner = styled.div`
  background: url(${bannerImage}) no-repeat center center;
  background-size: cover;
  height: 672px;
  align-items: end;
  display: flex;
`;