import styled from "styled-components";

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;

  @media (min-width: 944px) {
    flex-direction: row;
  }
`;

export const ProductImageContainer = styled.img`
  width: 464px;
  height: 584px;
  object-fit: cover;
  object-position: center;
  margin: 0 16px;

  @media (max-width: 944px) {
    width: 100%;
    height: auto;
    aspect-ratio: 464/584;
    margin : 0;
    margin-bottom: 16px;
  }
`;
