import { colors } from "../../styles/colors";
import styled from "styled-components";
export const Subtitle = styled.h3`
  color: ${colors.textBlack};
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);

    &.hidden {
    opacity: 0;
  }
`;
