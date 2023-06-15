import { colors } from "../../styles/colors";
import styled from "styled-components";
import { fonts } from "../../styles/fonts";

export const PaymentOptionsContainer = styled.div`
    background-color: ${colors.secondary};
    padding: 32px;
    flex-basis: 448px;
    order: 1;
    border-radius: 5px;

    * {
        color: ${colors.white}
    }

    label {
        font-weight: 500;
        display:block;
        width: 100%;
    }

    p {
        margin-bottom: 32px;
    }

    input {
        background-color: transparent;
        border: none;
        outline:none;
        border-bottom: 1px solid ${colors.white};
        padding: 8px 0
    }

    @media (max-width: 1120px) {
      width: 90vh;
  }

  @media (max-width: 660px) {
      width: 380px;
  }

  @media (max-width: 370px) {
      width: 320px;
  }


`;

export const PaymentLogo = styled.img`
  width: 280px;
  height: auto;
  margin: 0 auto;
  display: block;
  padding-bottom: 50px;

  @media (max-width: 660px) {
      width: 180px;
  }

`;

export const PaymentLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Defina a altura desejada para a div */
`;

export const ModalityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 48%;

  img {
    height: auto;
    margin-bottom: 20px;
    width: 60px;

      @media (max-width: 660px) {
      width: 50px;
  }
  }
`;

export const OptionLabel = styled.label`
  text-align: center;
  color: ${props => (props.selected ? colors.ctaBlack : "inherit")};

      @media (max-width: 660px) {
      font-size: ${fonts.textM};
  }

`;

export const ContactInfo = styled.div`
    input {
        margin: 16px 0 32px 0;
        width: 100%;
    }
`;

export const ConfirmButton = styled.button`
text-transform: uppercase;
font-weight: 700;
background-color: ${colors.white};
color: ${colors.secondary};
border: 0;
padding: 16px 32px;
margin: 16px auto;
display: block;
`;
