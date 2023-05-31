import styled from "styled-components";
import { colors } from "../../../styles/colors";
export const Slide = styled.div`
  height: 700px;
  width: 100%;
  color: #fff;
  align-items: end;
  display: flex;
`;

export const BannerRetangule = styled.div`
  margin-left: 30px;
  margin-bottom: 70px;
  width: 400px;
  height: 50px;
  background-color: ${colors.secondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BannerText = styled.text`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
  color: #ffffff;
  text-align: left;
  margin-left: 30px;
`;

export const BannerArrow = styled.button`
  background: none;
  float: right;
  border: none;
  color: ${colors.primary};
  margin-top: 9px;
  padding-right: 5px;
  font-size: 30px;
`;


export const Slide1 = styled(Slide)`
  background-image: url("/CrowStore/imgs/bannerJaqueta.png");
  background-size: cover;
`;

export const Slide2 = styled(Slide)`
  background-image: url("/CrowStore/imgs/bannerWhite.png");
  background-size: cover;
`;

export const Slide3 = styled(Slide)`
  background-image: url("/CrowStore/imgs/bannerConjuntoOutono.png");
  background-size: cover;
`;