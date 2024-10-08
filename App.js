import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { StripeProvider } from "@stripe/stripe-react-native"; // Commented out Stripe import
import * as Notifications from "expo-notifications";
import { AuthProvider } from "./src/contexts/AuthContext";
import { auth } from "./src/config/firebaseConfig";
// Import all screens
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
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><p>Something went wrong.</p></div>;
    }
    return this.props.children;
  }
}
const Stack = createStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log(token));
    scheduleWeeklyReminder();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received:", response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <ErrorBoundary>
      <AuthProvider>
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
      </AuthProvider>
    </ErrorBoundary>
  );
}
async function registerForPushNotificationsAsync() {
  try {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.warn("Failed to get push token for push notification!");
      return null;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Push token:", token);
    return token;
  } catch (error) {
    console.error("Error registering for push notifications:", error);
    return null;
  }
}
async function scheduleWeeklyReminder() {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Forgot Lunch in the Fridge Again?",
        body: "Get it Zoorted for less than a Sausage Roll :woozy_face:!",
      },
      trigger: {
        weekday: 5,
        hour: 12,
        minute: 0,
        repeats: true,
      },
    });
    console.log("Weekly reminder scheduled successfully");
  } catch (error) {
    console.error("Error scheduling weekly reminder:", error);
  }
}