import { Pressable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { Header } from "../../components";
import { Button } from "../../components/ui";
import { useState } from "react";
import { RegularText } from "../../components/StyledText";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function FinishProfileScreen() {
  const [avatarUrl, setavatarUrl] = useState("");
  const { navigate }: NavigationProp<AuthNavigationType> = useNavigation();

  async function handleAddAvatarToProfile() {}

  return (
    <Container>
      <View>
        <StatusBar style="dark" />
        <Header
          title="Profile"
          description="Finish setting up your profile by adding an avatar"
          canGoBack
          screen="Signup"
        />

        <AvatarContainer>
          <Ionicons name="cloud-upload-outline" size={24} />
          <Regular>Click to upload an image</Regular>
        </AvatarContainer>
      </View>

      <BottomView>
        <Button
          title="Create account"
          onPress={() => handleAddAvatarToProfile()}
        />
        <Pressable onPress={() => navigate("Login")}>
          <RegularText>Already have an account? Head to login</RegularText>
        </Pressable>
      </BottomView>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 20px;
  justify-content: space-between;
`;

const AvatarContainer = styled(TouchableOpacity)`
  margin-top: 40px;
  border-width: 1px;
  border-style: dashed;
  width: 250px;
  height: 250px;
  align-self: center;
  border-radius: 200px;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const BottomView = styled(View)`
  align-items: center;
  gap: 8px;
`;

const Regular = styled(RegularText)`
  text-align: center;
  font-size: 14px;
`;
