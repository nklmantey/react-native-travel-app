import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import RootNavigation from "./navigation/RootNavigation";
import { useCachedResources } from "./hooks";
import { View } from "react-native";
import styled from "styled-components/native";

export default function App() {
  const isLoadingComplete = useCachedResources();

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
