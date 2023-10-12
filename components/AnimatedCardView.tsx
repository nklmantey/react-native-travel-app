import { RegularText } from "./StyledText";
import { PlacesDataType } from "../constants/places";
import { useRef } from "react";
import { Animated, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH * 0.7;

export default function AnimatedCardView({
  category,
  id,
  image,
  location,
}: PlacesDataType) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const inputRange = [
    (id - 1) * CARD_WIDTH,
    id * CARD_WIDTH,
    (id + 1) * CARD_WIDTH,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1.5, 0.8],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginHorizontal: 10,
        transform: [{ scale }],
      }}
    >
      <RegularText>{location}</RegularText>
    </Animated.View>
  );
}
