import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { useSupabaseAuth } from "../../../hooks";
import { View } from "react-native";
import { Button, Input } from "../../../components/ui";
import { StatusBar } from "expo-status-bar";
import { Header } from "../../../components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useUserStore } from "../../../store/useUserStore";

export default function EditProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { updateUserProfile } = useSupabaseAuth();
  const { navigate }: NavigationProp<ProfileNavigationType> = useNavigation();

  async function handleUpdateProfile() {
    setLoading(true);

    try {
      const { error } = await updateUserProfile(username, fullName, avatarUrl);

      if (error) {
        setLoading(false);
        throw error;
      }

      navigate("Profile");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <StatusBar style="dark" />
      <Header
        title="Edit Profile"
        description="Edit your profile from here and save changes to update them"
        canGoBack
        screen="Profile"
      />

      <InputContainer>
        <Input
          value={username}
          onChangeText={(e) => setUsername(e)}
          placeholder="Edit your username"
          label="Edit username"
        />
        <Input
          value={fullName}
          onChangeText={(e) => setFullName(e)}
          placeholder="Edit your full name"
          label="Edit full name"
        />
        <Button
          title="Save changes"
          onPress={() => handleUpdateProfile()}
          isLoading={loading}
        />
      </InputContainer>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const InputContainer = styled(View)`
  margin-top: 40px;
  gap: 20px;
`;
