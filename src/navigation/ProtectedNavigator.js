import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";

import LoginChoiceScreen from "./LoginChoiceScreen";
import CustomerLoginScreen from "./CustomerLoginScreen";
import DriverLoginScreen from "./DriverLoginScreen";
import HomeScreen from "./HomeScreen";
import SetDropOffLocation from "./SetDropOffLocation";
import SelectItemTypeScreen from "./SelectItemTypeScreen";
import SelectItemScreen from "./SelectItemScreen";
import PickupLocationScreen from "./PickupLocationScreen";
import OrderSummaryScreen from "./OrderSummaryScreen";
import LinkCardScreen from "./LinkCardScreen";
import OrderConfirmationScreen from "./OrderConfirmationScreen";
import TrackDriverScreen from "./TrackDriverScreen";
import ViewRequestScreen from "./ViewRequestScreen";
import DirectionsScreen from "./DirectionsScreen";
import ConfirmDropOffScreen from "./ConfirmDropOffScreen";

const Stack = createStackNavigator();

const ProtectedNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          {user.role === "customer" ? (
            <>
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
              <Stack.Screen
                name="OrderSummary"
                component={OrderSummaryScreen}
              />
              <Stack.Screen name="LinkCard" component={LinkCardScreen} />
              <Stack.Screen
                name="OrderConfirmation"
                component={OrderConfirmationScreen}
              />
              <Stack.Screen name="TrackDriver" component={TrackDriverScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="ViewRequests" component={ViewRequestScreen} />
              <Stack.Screen name="Directions" component={DirectionsScreen} />
              <Stack.Screen
                name="ConfirmDropOff"
                component={ConfirmDropOffScreen}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="LoginChoice" component={LoginChoiceScreen} />
          <Stack.Screen name="CustomerLogin" component={CustomerLoginScreen} />
          <Stack.Screen name="DriverLogin" component={DriverLoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ProtectedNavigator;
