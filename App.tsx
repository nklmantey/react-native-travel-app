import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import RootNavigation from "./navigation/RootNavigation";
import { useCachedResources } from "./hooks";
import { View } from "react-native";
import styled from "styled-components/native";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const { session, user } = useUserStore();

  useEffect(() => console.log(user, session), [user, session]);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <RootNavigation />
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
`;
