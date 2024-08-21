import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { decode } from "@mapbox/polyline";

const GOOGLE_MAPS_API_KEY = "AIzaSyBd0sVEWWWTyztYX30VYtToIglg_g4LP4U"; // Replace with your actual API key

const DirectionsScreen = ({ route, navigation }) => {
  const { requestId } = route.params;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDirections();
  }, []);

  const fetchDirections = async () => {
    try {
      setLoading(true);
      // Get current location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      // Fetch delivery details from your backend
      const response = await fetch(
        `YOUR_BACKEND_URL/api/delivery-details/${requestId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch delivery details");
      }
      const data = await response.json();
      setDestinationLocation(data.dropOffLocation);

      // Fetch directions from Google Directions API
      const directionsResponse = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${location.coords.latitude},${location.coords.longitude}&destination=${data.dropOffLocation.latitude},${data.dropOffLocation.longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const directionsData = await directionsResponse.json();

      if (directionsData.status !== "OK") {
        throw new Error("Directions request failed");
      }

      const points = decode(directionsData.routes[0].overview_polyline.points);
      const coordinates = points.map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));

      setRouteCoordinates(coordinates);
      setDistance(directionsData.routes[0].legs[0].distance.text);
      setDuration(directionsData.routes[0].legs[0].duration.text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDelivery = async () => {
    try {
      const response = await fetch(
        `YOUR_BACKEND_URL/api/start-delivery/${requestId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add authentication header here
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to start delivery");
      }

      Alert.alert("Success", "Delivery started successfully");
      // You might want to navigate to a new screen or update the UI here
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading directions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchDirections}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentLocation && destinationLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={currentLocation} title="Your Location" />
          <Marker coordinate={destinationLocation} title="Destination" />
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#4A90E2"
            strokeWidth={3}
          />
        </MapView>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Distance: {distance}</Text>
        <Text style={styles.infoText}>Estimated Time: {duration}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleStartDelivery}>
        <Text style={styles.buttonText}>Start Delivery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  map: {
    width: "100%",
    height: "70%",
  },
  infoContainer: {
    padding: 20,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DirectionsScreen;
