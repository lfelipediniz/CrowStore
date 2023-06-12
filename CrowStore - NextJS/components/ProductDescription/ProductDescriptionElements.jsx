import styled from "styled-components";

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;

  @media screen and (min-width: 944px) {
    flex-direction: row;
    margin: 16px -8px;

    > * {
      margin: 0 8px;
    }
  }
`;

export const ProductImageContainer = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
