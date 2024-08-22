import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StripeProvider } from "@stripe/stripe-react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "./src/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./src/contexts/AuthContext";

// Screen importing
import LogoAnimationScreen from "./src/screens/LogoAnimationScreen";
import MainSelectionScreen from "./src/screens/MainSelectionScreen";
import LoginChoiceScreen from "./src/screens/LoginChoiceScreen";
import CustomerLoginScreen from "./src/screens/CustomerLoginScreen";
import DriverLoginScreen from "./src/screens/DriverLoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SetDropOffLocation from "./src/screens/SetDropOffLocation";
import SelectItemTypeScreen from "./src/screens/SelectItemTypeScreen";
import SelectItemScreen from "./src/screens/SelectItemScreen";
import PickupLocationScreen from "./src/screens/PickupLocationScreen";
import OrderSummaryScreen from "./src/screens/OrderSummaryScreen";
import LinkCardScreen from "./src/screens/LinkCardScreen";
import OrderConfirmationScreen from "./src/screens/OrderConfirmationScreen";
import TrackDriverScreen from "./src/screens/TrackDriverScreen";
import ViewRequestScreen from "./src/screens/ViewRequestScreen";
import ItemDetailsScreen from "./src/screens/ItemDetailsScreen";
import DirectionsScreen from "./src/screens/DirectionsScreen";
import ConfirmDropOffScreen from "./src/screens/ConfirmDropOffScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import OrderHistoryScreen from "./src/screens/OrderHistoryScreen";

const Stack = createStackNavigator();

// Notification config
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await AsyncStorage.getItem("userData");
        setUser(
          userData
            ? JSON.parse(userData)
            : { uid: firebaseUser.uid, email: firebaseUser.email }
        );
      } else {
        setUser(null);
        await AsyncStorage.removeItem("userData");
      }
      setIsLoading(false);
    });

    registerForPushNotificationsAsync().then((token) => console.log(token));
    scheduleWeeklyReminder();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
        // Handle the received notification
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received:", response);
        // Handle the notification response
      });

    return () => {
      unsubscribe();
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const authContext = {
    user,
    setUser: async (userData) => {
      setUser(userData);
      if (userData) {
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
      } else {
        await AsyncStorage.removeItem("userData");
      }
    },
    logout: async () => {
      setUser(null);
      await AsyncStorage.removeItem("userData");
    },
  };

  if (isLoading) {
    // Add loading screen if you have time!
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <StripeProvider publishableKey="pk_test_51PqdcXHFArldXYxVOw3jqGz32uE9jftmBSRmejLuBxC357wLEBDRFs3aukJipDLl9EGUCNPIJLxlXHshHLRQ4DEu002UajBIn0">
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LogoAnimation">
            <Stack.Screen
              name="LogoAnimation"
              component={LogoAnimationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainSelection"
              component={MainSelectionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginChoice"
              component={LoginChoiceScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CustomerLogin"
              component={CustomerLoginScreen}
            />
            <Stack.Screen name="DriverLogin" component={DriverLoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="SetDropOffLocation"
              component={SetDropOffLocation}
            />
            <Stack.Screen
              name="SelectItemType"
              component={SelectItemTypeScreen}
            />
            <Stack.Screen name="SelectItem" component={SelectItemScreen} />
            <Stack.Screen
              name="PickupLocation"
              component={PickupLocationScreen}
            />
            <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
            <Stack.Screen name="LinkCard" component={LinkCardScreen} />
            <Stack.Screen
              name="OrderConfirmation"
              component={OrderConfirmationScreen}
            />
            <Stack.Screen name="TrackDriver" component={TrackDriverScreen} />
            <Stack.Screen name="ViewRequests" component={ViewRequestScreen} />
            <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
            <Stack.Screen name="Directions" component={DirectionsScreen} />
            <Stack.Screen
              name="ConfirmDropOff"
              component={ConfirmDropOffScreen}
            />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </StripeProvider>
    </AuthContext.Provider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  return token;
}

function scheduleWeeklyReminder() {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Forgot Lunch in the Fridge Again?",
      body: "Get it Zoorted for less than a Sausage Roll 🥴!",
    },
    trigger: {
      weekday: 3, // Wednesday
      hour: 12,
      minute: 0,
      repeats: true,
    },
  });
}
