import { colors } from "../../styles/colors";
import styled from "styled-components";

export const PaymentOptionsContainer = styled.div`
  background-color: ${colors.black};
`;

export const PaymentLogo = styled.img`
  width: 280px;
  height: auto;
  margin: 32px 52px;
`;

export const ModalityContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 48%;

  img {
    width: 100%;
    height: auto;
  }
`;

export const OptionLabel = styled.label`
  text-align: center;
`;

export const ContactInfo = styled.div`
  label {
    margin-bottom: 8px;
  }

  input {
    margin-bottom: 16px;
    width: 100%;
  }
`;

export const ConfirmButton = styled.button`
  text-transform: uppercase;
  font-weight: 700;
  background-color: ${colors.white};
  color: ${colors.black};
  border: 0;
  padding: 16px 32px;
  margin: 16px auto;
  display: block;
`;
