import styled from "styled-components";
import { colors } from "../../styles/colors";
import bannerImage from "../../public/CrowStore/imgs/bannerJaqueta.png";


export const HeroContainer = styled.div`
  @media (max-width: 768px) {
  }
  @media (max-width: 480px) {
  }
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