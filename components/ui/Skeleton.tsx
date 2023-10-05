import { useEffect, useState } from "react";
import { Animated, DimensionValue, Easing } from "react-native";

type SkeletonProps = {
  height: DimensionValue;
  width: DimensionValue;
  borderRadius: number;
};

export default function Skeleton({
  height,
  width,
  borderRadius,
}: SkeletonProps) {
  const [opacityValue, setOpacityValue] = useState(new Animated.Value(1));

  const pulseAnimation = () => {
    Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: 0.2,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      pulseAnimation();
    });
  };

  useEffect(() => {
    pulseAnimation();
  }, []);

  return (
    <Animated.View
      style={{
        height,
        width,
        borderRadius,
        backgroundColor: "#eee",
        opacity: opacityValue,
      }}
    />
  );
}
