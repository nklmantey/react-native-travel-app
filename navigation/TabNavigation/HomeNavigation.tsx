import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { HomeScreen } from "../../screens/tabs/home";

const Stack = createStackNavigator<HomeNavigationType>();

export default function HomeNavigation() {
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
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
