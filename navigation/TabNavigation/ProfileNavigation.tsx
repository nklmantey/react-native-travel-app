import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { ProfileScreen, EditProfileScreen } from "../../screens/tabs/profile";

const Stack = createStackNavigator<ProfileNavigationType>();

export default function ProfileNavigation() {
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
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
