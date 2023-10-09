import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { Header } from "../../components";
import { Button, Input } from "../../components/ui";
import { useState } from "react";
import { RegularText } from "../../components/StyledText";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSupabaseAuth } from "../../hooks";
import { useUserStore } from "../../store/useUserStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { navigate }: NavigationProp<AuthNavigationType> = useNavigation();
  const { signInWithEmail } = useSupabaseAuth();
  const setUser = useUserStore((state) => state.setUser);
  const setSession = useUserStore((state) => state.setSession);

  async function handleLogin() {
    setLoading(true);

    try {
      const { data, error } = await signInWithEmail(email, password);

      if (error) {
        setLoading(false);
        console.log(error);
      }

      if (data.user === null || data.session === null) {
        setLoading(false);
      }

      if (data.session && data.user) {
        setSession(data.session);
        setUser(data.user);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container>
      <View>
        <StatusBar style="dark" />
        <Header
          title="Login"
          description="Fill in the fields below to log back in"
          canGoBack
          screen="Welcome"
        />

        <InputContainer>
          <Input
            value={email}
            onChangeText={(e) => setEmail(e)}
            placeholder="Enter a valid email address"
            label="Email"
          />
          <Input
            value={password}
            onChangeText={(e) => setPassword(e)}
            placeholder="Enter your password"
            isPassword
            label="Password"
          />
        </InputContainer>
      </View>

      <BottomView>
        <Button
          title="Log in"
          onPress={() => handleLogin()}
          isLoading={loading}
        />
        <TouchableOpacity onPress={() => navigate("Signup")}>
          <RegularText>Don't have an account? Create one now</RegularText>
        </TouchableOpacity>
      </BottomView>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 20px;
  justify-content: space-between;
`;

const InputContainer = styled(View)`
  margin-top: 40px;
  gap: 20px;
`;

const BottomView = styled(View)`
  align-items: center;
  gap: 8px;
`;
