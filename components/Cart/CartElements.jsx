import { colors } from "../../styles/colors";
import styled from "styled-components";

export const StyledCart = styled.div`
    order: 0;

    @media (max-width: 864px) {
        width: 100%;
    }

    @media (min-width: 864px) {
        flex-grow: 1;
        margin-right: 16px;
    }
`;

export const ProductContainer = styled.div`
  background-color: ${colors.lightGray};
  width: 550px;

  /* @media (max-width: 560px) {
    display: none;
} */
  height: 256px;
  position: relative;
  margin-bottom: 32px;
  display: flex;
  align-items: stretch;
`;

export const ProductImage = styled.img`
  order: 0;
  width: 160px;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const ProductDescription = styled.div`
  order: 1;
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const H2 = styled.h2`
    font-weight: 300;
    font-size: 1.25em !important;
    margin: 0;
`;

export const ProductId = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: 944px) {
      flex-direction: column;
  }
`;

export const RemoveButton = styled.button`
  background-color: ${colors.cta};
  color: ${colors.white};
  border: 0px;
  width: 96px;
  height: 36px;
  padding: 8px 16px;
  margin-left: auto;
  
  @media (max-width: 944px) {
      margin-left: 0;
      margin-top: 8px;
  }

  &:hover {
    background-color: ${colors.ctaHover};
  }
`;

export const ProductPricing = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  flex-direction: column;
`;

export const Row = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const QuantityLabel = styled.label`
  margin-right: 16px;
  text-transform: uppercase; 
`;

export const QuantityInput = styled.input`
  text-align: right;
  height: 40px;
  width: 64px;
`;

export const TotalContainer = styled.div`
  border-top: 1px solid ${colors.textBlack};
`;


export const H3 = styled.h3`
    font-weight:500;
`;

