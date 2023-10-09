import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BoldText } from "../StyledText";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type InputProps = {
  type?: KeyboardTypeOptions;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  label?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  isPassword?: boolean;
  onChangeText: (e: string) => void;
  autoFocus?: boolean;
};

export default function Input({
  type = "default",
  placeholder,
  disabled,
  value,
  label,
  isPassword,
  returnKeyType,
  onChangeText,
  autoFocus,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={{ gap: 4 }}>
      {label && <BoldText>{label}</BoldText>}

      <View
        style={{
          flexDirection: isPassword ? "row" : undefined,
          height: 40,
          width: "100%",
          borderRadius: 6,
          borderWidth: !isPassword ? 0 : isFocused ? 1.5 : 1,
          borderColor: isFocused ? "#000" : "#d3d3d3",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={{
            height: 40,
            width: isPassword ? "85%" : "100%",
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderWidth: isPassword ? 0 : isFocused ? 1.5 : 1,
            borderColor: isFocused ? "#000" : "#d3d3d3",
            fontFamily: "SatoshiRegular",
            alignItems: "center",
            color: disabled ? "gray" : "#000",
          }}
          keyboardType={type}
          editable={!disabled}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="gray"
          secureTextEntry={isPassword && !isPasswordVisible}
          returnKeyType={returnKeyType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
        />

        {isPassword && (
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setIsPasswordVisible((prev) => !prev)}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              color={"#000"}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
