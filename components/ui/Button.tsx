import { TouchableOpacity, ActivityIndicator } from "react-native";
import { BoldText } from "../StyledText";

type ButtonProps = {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "sm" | "default" | "lg";
  title: string;
  onPress: () => void;
  icon?: JSX.Element;
  isLoading?: boolean;
};

export default function Button({
  variant = "default",
  size = "default",
  title,
  onPress,
  icon,
  isLoading,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor:
          variant === "default"
            ? "#000"
            : variant === "destructive"
            ? "crimson"
            : variant === "secondary"
            ? "#d3d3d3"
            : variant === "outline" || variant === "ghost"
            ? "transparent"
            : "",
        height: size === "default" ? 40 : size === "sm" ? 36 : 44,
        paddingHorizontal: size === "default" ? 16 : size === "sm" ? 12 : 32,
        paddingVertical: size === "default" ? 8 : 0,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: variant === "outline" ? 1 : 0,
        borderColor: variant === "outline" ? "#d3d3d3" : "",
        flexDirection: icon ? "row" : undefined,
        gap: icon ? 12 : 0,
        width: "100%",
      }}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          <BoldText
            style={{
              color:
                variant === "default" || variant === "destructive"
                  ? "#fff"
                  : "#000",
              fontSize: 16,
            }}
          >
            {title}
          </BoldText>
          {icon && icon}
        </>
      )}
    </TouchableOpacity>
  );
}
