import { TouchableOpacity, View } from "react-native";
import { HeadingText, RegularText } from "./StyledText";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type HeaderProps = {
  title: string;
  description?: string;
  canGoBack?: boolean;
  screen?: string;
};

export default function Header({
  title,
  description,
  canGoBack,
  screen,
}: HeaderProps) {
  const { navigate }: NavigationProp<any> = useNavigation();

  return (
    <View style={{ gap: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          gap: 20,
        }}
      >
        {canGoBack && (
          <TouchableOpacity
            onPress={() => navigate(`${screen}`)}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 0.5,
              borderColor: "#d3d3d3",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="arrow-back" size={15} color={"gray"} />
          </TouchableOpacity>
        )}
        <HeadingText style={{ color: "#000" }}>{title}</HeadingText>
      </View>
      <RegularText style={{ color: "#000", fontSize: 16 }}>
        {description}
      </RegularText>
    </View>
  );
}
