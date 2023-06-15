import { colors } from "../../styles/colors";
import styled from "styled-components";
import { fonts } from "../../styles/fonts";

export const StyledCart = styled.div`
  order: 0;


  @media (max-width: 1120px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 25px;
  }
`;

export const ProductContainer = styled.div`
  background-color: ${colors.lightGray};
  width: 550px;

  height: 256px;
  position: relative;
  margin-bottom: 32px;
  display: flex;
  align-items: stretch;
  border-radius: 5px;

  @media (max-width: 1120px) {
    display: none;
  }
`;

export const ProductImage = styled.img`
  order: 0;
  width: 160px;
  height: 100%;
  object-fit: cover;
  object-position: center;

    border-radius: 5px 0 0 5px;

    @media (max-width: 1120px) {
    width: 230px;

    border-radius: 5px 5px 0 0px;
  }
`;

export const ProductDescription = styled.div`
  order: 1;
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1120px) {
    padding: 3px;
  }
`;

export const H2 = styled.h2`
  font-weight: 300;
  font-size: 1.25em !important;
  margin: 0;

  @media (max-width: 1120px) {
    font-size: ${fonts.textM} !important;
  }
`;

export const ProductId = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: 1120px) {
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
  border-radius: 3px;

  @media (max-width: 1120px) {
    margin-left: 0;
    width: 90px;
    height: 30px;
    margin-top: 10px;
    font-size: ${fonts.textM};
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

  @media (max-width: 1120px) {
    margin-top: 5px;
  }
`;

export const QuantityLabel = styled.label`
  margin-right: 16px;
  text-transform: uppercase;

  @media (max-width: 1120px) {
    font-size: ${fonts.textM};
  }
`;

export const QuantityInput = styled.input`
  text-align: right;
  height: 40px;
  width: 64px;
  background-color: rgba(${parseInt(colors.lightGray.slice(1, 3), 16)}, ${parseInt(colors.lightGray.slice(3, 5), 16)}, ${parseInt(colors.lightGray.slice(5, 7), 16)}, 0.75);
  border: 1px solid ${colors.textBlack};
  border-radius: 3px;
  padding: 10px;
  
  @media (max-width: 1120px) {
    height: 25px;
    width: auto;
  }
`;

export const TotalContainer = styled.div`
  border-top: 1px solid ${colors.textBlack};

    @media (max-width: 1120px) {
    margin-top: 50px;
  }


`;

export const H3 = styled.h3`
  font-weight: 500;

  @media (max-width: 1120px) {
    margin-top: 10px;
    font-size: ${fonts.textM};
  }
`;

// Estilize o componente do produto móvel
export const MobileProduct = styled.div`
  @media (min-width: 1120px) {
    display: none;
  }
  width: auto;
  height: auto;
  margin-right: 20px;
  padding: 10px; /* Adicione um padding para criar um espaço entre o conteúdo e as bordas */
  background-color: ${colors.lightGray};
  border-radius: 5px;
  
`;

// Estilize o espaço para a imagem do produto dentro do componente do produto móvel
export const MobileProductImage = styled.img`
  width: 100%;
  height: 150px;

  @media (min-width: 1120px) {
    display: none;
  }
`;
