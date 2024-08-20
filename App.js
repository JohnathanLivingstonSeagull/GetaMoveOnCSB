import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/screens/SplashScreen";
import LoginChoiceScreen from "./src/screens/LoginChoiceScreen";
import CustomerLoginScreen from "./src/screens/CustomerLoginScreen";
import DriverLoginScreen from "./src/screens/DriverLoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SelectItemTypeScreen from "./src/screens/SelectItemTypeScreen";
import SelectItemScreen from "./src/screens/SelectItemScreen"; // Already Done
import SetSafeOptionScreen from "./src/screens/SetSafeOptionScreen";
import PickupLocationScreen from "./src/screens/PickupLocationScreen";
import SetDropOffLocationScreen from "./src/screens/SetDropOffLocationScreen"; // Already Done
import LinkCardScreen from "./src/screens/LinkCardScreen";
import TrackDriverScreen from "./src/screens/TrackDriverScreen";
import ConfirmDeliveryScreen from "./src/screens/ConfirmDeliveryScreen";
import ViewRequestsScreen from "./src/screens/ViewRequestsScreen";
import ItemDetailsScreen from "./src/screens/ItemDetailsScreen";
import DirectionsScreen from "./src/screens/DirectionsScreen";
import ConfirmDropOffScreen from "./src/screens/ConfirmDropOffScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverLogin"
          component={DriverLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectItemType"
          component={SelectItemTypeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectItem"
          component={SelectItemScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SetSafeOption"
          component={SetSafeOptionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PickupLocation"
          component={PickupLocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SetDropOffLocation"
          component={SetDropOffLocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LinkCard"
          component={LinkCardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrackDriver"
          component={TrackDriverScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmDelivery"
          component={ConfirmDeliveryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewRequests"
          component={ViewRequestsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Directions"
          component={DirectionsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmDropOff"
          component={ConfirmDropOffScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
