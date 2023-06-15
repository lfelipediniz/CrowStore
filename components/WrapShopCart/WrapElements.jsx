import { colors } from "../../styles/colors";
import styled from "styled-components";

export const ShopcartWrapper = styled.div`
  background-color: ${colors.primary};

    display: grid;
    place-items: center;
    overflow: hidden;
  
`;

export const ShopcartContainer = styled.div`
  display: grid;

  overflow: hidden;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 2000px;
`;

export const ProductContainer = styled.div`
  padding: 20px;
`;

export const PaymentContainer = styled.div`
  padding: 20px;
`;

export const Header = styled.h1`
  margin-top: 100px;
  font-size: 2em;
  font-weight: 700;
  width: 100%;
  margin-bottom: 0;
  padding-bottom: 32px;
  border-bottom: 1px solid ${colors.textBlack};
`;

export const Link = styled.a`
  color: ${colors.textBlack};
  width: 100%;
`;
