import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  runOnJS,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { BoldText, RegularText } from "../StyledText";
import Button from "./Button";
import { View } from "react-native";

export interface AlertProps {
  title?: string;
  message?: string;
  duration?: number;
  action?: boolean;
  actionTitle?: string;
  actionOnPress?: () => void;
}

export const Alert = forwardRef(({ actionOnPress }: AlertProps, ref) => {
  const translateY = useSharedValue<number>(-100);
  const [isShown, setIsShown] = useState(false);
  const [title, setTitle] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [action, setAction] = useState(false);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(20000);

  const showAlert = useCallback(
    ({ title, message, duration, action, actionTitle }: AlertProps) => {
      setTitle(title ? title : "");
      setAction(action ?? false);
      setActionTitle(actionTitle ? actionTitle : "");
      setMessage(message ? message : "");
      setDuration(duration ? duration : 3000);

      setIsShown(true);
      translateY.value = withSequence(
        withTiming(60),
        withDelay(
          duration ? duration : 3000,
          withTiming(-100, undefined, (finish) => {
            if (finish) {
              runOnJS(setIsShown)(false);
            }
          })
        )
      );
    },
    [translateY]
  );

  useImperativeHandle(
    ref,
    () => ({
      showAlert,
    }),
    [showAlert]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {};
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      if (event.translationY < 100) {
        translateY.value = withSpring(ctx.startY + event.translationY, {
          damping: 600,
          stiffness: 100,
        });
      }
    },
    onEnd: (event) => {
      if (event.translationY < 0) {
        translateY.value = withTiming(-100, undefined, (finish) => {
          if (finish) {
            runOnJS(setIsShown)(false);
          }
        });
      } else if (event.translationY > 0) {
        translateY.value = withSequence(
          withTiming(60),
          withDelay(
            duration,
            withTiming(-100, undefined, (finish) => {
              if (finish) {
                runOnJS(setIsShown)(false);
              }
            })
          )
        );
      }
    },
  });

  return (
    <>
      {isShown && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={{
              position: "absolute",
              bottom: 0,
              width: "90%",
              alignSelf: "center",
              marginBottom: 40,
              borderWidth: 1,
              borderColor: "#d3d3d3",
              borderRadius: 8,
              padding: 16,
              zIndex: 1000,
              backgroundColor: "transparent",
            }}
          >
            <BoldText
              style={{
                marginBottom: 4,
              }}
            >
              {title}
            </BoldText>
            <View style={{ gap: 12 }}>
              <RegularText>{message}</RegularText>
              {action && actionTitle && actionOnPress && (
                <View style={{ alignSelf: "flex-start" }}>
                  <Button title={actionTitle} onPress={actionOnPress} />
                </View>
              )}
            </View>
          </Animated.View>
        </PanGestureHandler>
      )}
    </>
  );
});
