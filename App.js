import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LogoAnimationScreen from "./src/screens/LogoAnimationScreen";
import MainSelectionScreen from "./src/screens/MainSelectionScreen";
import CustomerLoginScreen from "./src/screens/CustomerLoginScreen";
import PickupLocationScreen from "./src/screens/PickupLocationScreen";
import DeliveryConfirmationScreen from "./src/screens/DeliveryConfirmationScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogoAnimation"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LogoAnimation" component={LogoAnimationScreen} />
        <Stack.Screen name="MainSelection" component={MainSelectionScreen} />
        <Stack.Screen name="CustomerLogin" component={CustomerLoginScreen} />
        <Stack.Screen name="PickupLocation" component={PickupLocationScreen} />
        <Stack.Screen
          name="DeliveryConfirmation"
          component={DeliveryConfirmationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
