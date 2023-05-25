import styled from "styled-components";
import { colors } from "../../styles/colors";
import bannerImage from "../../public/CrowStore/imgs/bannerJaqueta.png";


export const HeroContainer = styled.div`
  height: 470px;
  @media (max-width: 768px) {
    padding: 100px 0 0 0;
    height: 630px;
  }
  @media (max-width: 480px) {
    padding: 0;
    height: 500px;
  }
`;

export const HeroWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: auto;
  width: 100%;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  padding: 0;
  justify-content: center;
  min-height: 700px;
`;

export const Banner = styled.div`
  background: url(${bannerImage}) no-repeat center center;
  background-size: cover;
  height: 672px;
  align-items: end;
  display: flex;
`;