import { colors } from "../../styles/colors";
import styled from "styled-components";

export const Container = styled.div`
  background-color: ${colors.primary};
`;

export const ShopcartWrapper = styled.div`
  background-color: ${colors.primary};
  display: grid;
  place-items: center;
  overflow: hidden;

  @media (max-width: 1120px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  @media (max-width: 570px) {
    padding: 10px;
  }
`;

export const ShopcartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 2000px;

  @media (max-width: 1120px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 570px) {
    gap: 10px;
  }
`;

export const ProductContainer = styled.div`
  padding: 20px;

  @media (max-width: 570px) {
    padding: 10px;
  }
`;

export const PaymentContainer = styled.div`
  padding: 20px;

  @media (max-width: 570px) {
    padding: 10px;
  }
`;

export const Header = styled.h1`
  margin-top: 100px;
  font-size: 2em;
  font-weight: 700;
  width: 100%;
  margin-bottom: 0;
  padding-bottom: 32px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${colors.textBlack};

  @media (max-width: 1120px) {
    font-size: 1.5em;
  }
`;

export const Link = styled.a`
  color: ${colors.textBlack};
  width: 100%;

  @media (max-width: 1120px) {
    margin-top: 20px;
  }
`;
