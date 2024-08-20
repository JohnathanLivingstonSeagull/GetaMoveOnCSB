import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const TrackDriverScreen = ({ navigation, route }) => {
  const {
    dropOffLocation,
    itemName,
    itemDescription,
    pickupLocation,
    requiresSafe,
    safeCode,
  } = route.params;
  const [driverLocation, setDriverLocation] = useState(null);
  const [isDriverNearby, setIsDriverNearby] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      // Simulate driver's moving location; replace with real-time updates from a backend in a production app
      const interval = setInterval(() => {
        const newLocation = {
          latitude: 37.78825 + Math.random() * 0.01,
          longitude: -122.4324 + Math.random() * 0.01,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setDriverLocation(newLocation);

        // Check if driver is nearby drop-off location
        const distance = getDistance(
          { latitude: newLocation.latitude, longitude: newLocation.longitude },
          {
            latitude: dropOffLocation.latitude,
            longitude: dropOffLocation.longitude,
          }
        );
        if (distance < 100) {
          // within 100 meters
          setIsDriverNearby(true);
        } else {
          setIsDriverNearby(false);
        }
      }, 2000);

      return () => clearInterval(interval);
    })();
  }, [dropOffLocation]);

  const getDistance = (loc1, loc2) => {
    // Use Haversine formula or other methods to calculate the distance
    const R = 6371e3; // metres
    const φ1 = (loc1.latitude * Math.PI) / 180;
    const φ2 = (loc2.latitude * Math.PI) / 180;
    const Δφ = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
    const Δλ = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
  };

  const handleUnlockSafe = () => {
    // Handle unlocking the safe, ideally interacting with the smart safe's API
    alert("Safe is unlocked");
  };

  const handleConfirmDelivery = () => {
    navigation.navigate("ConfirmDeliveryScreen");
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: driverLocation?.latitude || 37.78825,
          longitude: driverLocation?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {driverLocation && (
          <Marker coordinate={driverLocation} title="Driver" />
        )}
        {dropOffLocation && (
          <Marker
            coordinate={dropOffLocation}
            title="Drop-off Location"
            pinColor="green"
          />
        )}
      </MapView>
      {isDriverNearby && (
        <TouchableOpacity style={styles.button} onPress={handleUnlockSafe}>
          <Text style={styles.buttonText}>Unlock Safe</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={handleConfirmDelivery}>
        <Text style={styles.buttonText}>Confirm Delivery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  button: {
    position: "absolute",
    bottom: 50,
    width: "90%",
    height: 48,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TrackDriverScreen;
