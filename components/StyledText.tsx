import { Text } from "react-native";
import styled from "styled-components/native";

export const ExtraBoldText = styled(Text)`
  font-size: 16px;
  font-family: SatoshiExtrabold;
`;

export const BoldText = styled(Text)`
  font-size: 16px;
  font-family: SatoshiBold;
`;

export const RegularText = styled(Text)`
  font-size: 16px;
  font-family: SatoshiRegular;
`;

export const ErrorText = styled(Text)`
  font-size: 14px;
  font-family: SatoshiRegular;
  color: crimson;
`;

export const MediumText = styled(Text)`
  font-size: 16px;
  font-family: SatoshiMedium;
`;

export const HeadingText = styled(Text)`
  font-family: SatoshiExtrabold;
  font-size: 24px;
`;
