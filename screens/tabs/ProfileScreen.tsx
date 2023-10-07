import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { useSupabaseAuth } from "../../hooks";
import { View } from "react-native";
import { Button, Input } from "../../components/ui";
import { StatusBar } from "expo-status-bar";
import { Header } from "../../components";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useUserStore } from "../../store/useUserStore";

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { getUserProfile, updateUserProfile } = useSupabaseAuth();
  const { navigate }: NavigationProp<TabNavigationType> = useNavigation();
  const session = useUserStore((state) => state.session);

  async function getProfile() {
    setLoading(true);

    try {
      const { data, error, status } = await getUserProfile();

      if (error && status !== 406) {
        setLoading(false);
        throw error;
      }

      if (data) {
        console.log(data);
        setUsername(data.username);
        setFullName(data.full_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    setLoading(true);

    try {
      const { error } = await updateUserProfile(username, fullName, avatarUrl);

      if (error) {
        setLoading(false);
        throw error;
      }

      navigate("HomeNavigation");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session]);

  return (
    <Container>
      <StatusBar style="dark" />
      <Header
        title="Profile"
        description="Edit the fields"
        canGoBack
        screen="Home"
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
          onPress={() => updateProfile()}
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
