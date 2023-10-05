import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import HomeNavigation from "./HomeNavigation";

const Stack = createStackNavigator<TabNavigationType>();

export default function TabNavigation() {
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
      <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
    </Stack.Navigator>
  );
}
