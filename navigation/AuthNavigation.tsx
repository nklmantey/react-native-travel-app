import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { LoginScreen, WelcomeScreen, SignupScreen } from "../screens/auth";

const Stack = createStackNavigator<AuthNavigationType>();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
