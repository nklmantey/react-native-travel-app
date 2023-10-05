import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";

const Stack = createStackNavigator<RootNavigationType>();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
