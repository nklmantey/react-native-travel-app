import { Pressable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { Header } from "../../components";
import { Button, Input } from "../../components/ui";
import { useState } from "react";
import { ErrorText, RegularText } from "../../components/StyledText";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSupabaseAuth } from "../../hooks";
import { useUserStore } from "../../store/useUserStore";
import { useForm, Controller } from "react-hook-form";
import { RegisterSchema } from "../../schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type RegisterInputType = z.infer<typeof RegisterSchema>;

export default function SignupScreen() {
  const [loading, setLoading] = useState(false);
  const { navigate }: NavigationProp<AuthNavigationType> = useNavigation();
  const { signUpWithEmail } = useSupabaseAuth();
  const { setUser, setSession } = useUserStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputType>({
    resolver: zodResolver(RegisterSchema),
  });

  async function onSubmit({ email, password }: RegisterInputType) {
    setLoading(true);
    try {
      const { data, error } = await signUpWithEmail(email, password);

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

      navigate("Login");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container>
      <View>
        <StatusBar style="dark" />
        <Header
          title="Sign up"
          description="Fill in the fields below to create an account"
          canGoBack
          screen="Login"
        />

        <InputContainer>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputView>
                <Input
                  value={field.value}
                  onChangeText={(e) => field.onChange(e)}
                  placeholder="Enter your email address"
                  label="Email"
                />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
              </InputView>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputView>
                <Input
                  value={field.value}
                  onChangeText={(e) => field.onChange(e)}
                  placeholder="Enter your password"
                  label="Password"
                  isPassword
                />
                {errors.password && (
                  <ErrorText>{errors.password.message}</ErrorText>
                )}
              </InputView>
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <InputView>
                <Input
                  value={field.value}
                  onChangeText={(e) => field.onChange(e)}
                  placeholder="Re-enter your password"
                  label="Confirm Password"
                  isPassword
                />
                {errors.confirmPassword && (
                  <ErrorText>{errors.confirmPassword.message}</ErrorText>
                )}
              </InputView>
            )}
          />
        </InputContainer>
      </View>

      <BottomView>
        <Button
          title="Next"
          onPress={handleSubmit(onSubmit)}
          isLoading={loading}
        />
        <TouchableOpacity onPress={() => navigate("Login")}>
          <RegularText>Already have an account? Head to login</RegularText>
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

const InputView = styled(View)`
  gap: 4px;
`;

const BottomView = styled(View)`
  align-items: center;
  gap: 8px;
`;
