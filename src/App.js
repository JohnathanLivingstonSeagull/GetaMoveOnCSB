import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/screens/SplashScreen";
import LoginChoiceScreen from "./src/screens/LoginChoiceScreen";
import CustomerLoginScreen from "./src/screens/CustomerLoginScreen";
import DriverLoginScreen from "./src/screens/DriverLoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import * as React from "react";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
