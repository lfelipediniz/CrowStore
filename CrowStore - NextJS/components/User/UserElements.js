import styled from "styled-components";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const UserContainer = styled.div`
  display: flex;
  padding: 3rem 0;
  margin-top: 80px;
  width: 100%;
  height: 90vh;
  background-color: ${colors.primary};
`;

export const SideNavContainer = styled.div`
  background-color: #262626;
  width: 276px;
  height: 100%;
`;

export const SideNavItem = styled.div`
  padding: 10px;
  color: ${colors.primary};
  cursor: pointer;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.cta};
  }
`;

export const EditModeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

export const EditModeButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  margin-right: 1rem;
  cursor: pointer;
`;

export const EditModeOptions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const EditModeOption = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
