import { colors } from "../../styles/colors";
import styled from "styled-components";

export const ProductContainer = styled.div`
  background-color: ${colors.lightGray};
  width: 100%;
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

export const ProductName = styled.h2`
  flex-grow: 1;
  margin-bottom: 16px;
`;

export const ProductId = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RemoveButton = styled.button`
  background-color: ${colors.cta};
  color: ${colors.white};
  border: 0px;
  width: 96px;
  height: 36px;
  padding: 8px 16px;
  margin-left: auto;

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

export const StyledCart = styled.div`
    order: 0;

    @media (max-width: 464px) {
        width: 100%;
    }

    @media (min-width: 464px) {
        flex-grow: 1;
        width: calc(100% - 224px);
        max-width: calc(100% - 464px);
        margin-right: 16px;
    }
`;

export const H3 = styled.h3`
    font-family: Inter, sans-serif;
    font-size: 1em;
    line-height: 1.5em;
    box-sizing: border-box;
    font-weight:500;
    text-transform: uppercase;
    margin-right: 16px;
`;

export const P = styled.p`
    font-family: Inter, sans-serif;
    font-size: 1em;
    line-height: 1.5em;
    box-sizing: border-box;
`


