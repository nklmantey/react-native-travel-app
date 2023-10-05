import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  //Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          SatoshiExtrabold: require("../assets/fonts/Satoshi-Black.otf"),
          SatoshiBold: require("../assets/fonts/Satoshi-Bold.otf"),
          SatoshiMedium: require("../assets/fonts/Satoshi-Medium.otf"),
          SatoshiRegular: require("../assets/fonts/Satoshi-Regular.otf"),
          ...FontAwesome.font,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        alert(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
