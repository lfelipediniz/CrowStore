import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const Slide = styled.div`
  height: 700px;
  width: 100%;
  color: #fff;
  align-items: end;
  display: flex;

  @media (max-width: 900px) {
    height: 300px;
  }
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

  @media (max-width: 900px) {
    display: none;
  }
`;

export const BannerText = styled.text`
  font-style: normal;
  padding-left: 20px;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
  color: #ffffff;
  text-align: left;
  margin-left: 0;
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
  position: relative;

  @media (max-width: 640px) {
    background-size: contain;
    background-repeat: no-repeat;
    margin-top: 80px;
  }
`;

export const Slide2 = styled(Slide)`
  background-image: url("/CrowStore/imgs/bannerWhite.png");
  background-size: cover;

  @media (max-width: 640px) {
    margin-top: 80px;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export const Slide3 = styled(Slide)`
  background-image: url("/CrowStore/imgs/bannerConjuntoOutono.png");
  background-size: cover;

  @media (max-width: 640px) {
    margin-top: 80px;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;
