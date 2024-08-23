import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";

import LoginChoiceScreen from '../screens/LoginChoiceScreen';
import CustomerLoginScreen from '../screens/CustomerLoginScreen';
import DriverLoginScreen from '../screens/DriverLoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SetDropOffLocation from '../screens/SetDropOffLocation';
import SelectItemTypeScreen from '../screens/SelectItemTypeScreen';
import SelectItemScreen from '../screens/SelectItemScreen';
import PickupLocationScreen from '../screens/PickupLocationScreen';
import OrderSummaryScreen from '../screens/OrderSummaryScreen';
import LinkCardScreen from '../screens/LinkCardScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';
import TrackDriverScreen from '../screens/TrackDriverScreen';
import ViewRequestScreen from '../screens/ViewRequestScreen';
import DirectionsScreen from '../screens/DirectionsScreen';
import ConfirmDropOffScreen from '../screens/ConfirmDropOffScreen';

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
