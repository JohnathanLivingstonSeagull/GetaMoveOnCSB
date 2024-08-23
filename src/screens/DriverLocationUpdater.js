import React, { useEffect, useContext } from "react";
import * as Location from "expo-location";
import { AuthContext } from "../contexts/AuthContext";
import { globalStyles, colors } from "../styles/globalStyles";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebaseConfig';

const DriverLocationUpdater = ({ orderId }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let locationSubscription;

    const startLocationUpdates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => updateDriverLocation(location)
      );
    };

    const updateDriverLocation = async (location) => {
      try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
          driverLocation: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        });
      } catch (error) {
        console.error("Error updating driver location:", error);
      }
    };

    if (user.type === "driver" && orderId) {
      startLocationUpdates();
    }

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [orderId, user]);

  return null; 
};

export default DriverLocationUpdater;
