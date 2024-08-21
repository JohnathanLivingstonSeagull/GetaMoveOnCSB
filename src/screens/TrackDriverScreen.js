import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import ErrorDisplayComponent from "../../ErrorDisplayComponent";
import LoadingDisplayComponent from "../../LoadingDisplayComponent";

const GOOGLE_MAPS_API_KEY = "AIzaSyBd0sVEWWWTyztYX30VYtToIglg_g4LP4U";

const TrackDriverScreen = ({ route }) => {
  const { deliveryId } = route.params;
  const [driverLocation, setDriverLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [estimatedArrival, setEstimatedArrival] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeliveryDetails();
  }, []);

  const fetchDeliveryDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      // In a real app, you would fetch this data from your backend
      // For now, we'll use mock data and simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setDestinationLocation({
        latitude: 37.78825,
        longitude: -122.4324,
      });
      setEstimatedArrival("15 minutes");
      setDriverLocation({
        latitude: 37.78825,
        longitude: -122.4324,
      });
    } catch (err) {
      setError("Failed to fetch delivery details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const simulateDriverMovement = () => {
    setDriverLocation((currentLocation) => {
      if (!currentLocation) return currentLocation;
      return {
        latitude: currentLocation.latitude + (Math.random() - 0.5) * 0.01,
        longitude: currentLocation.longitude + (Math.random() - 0.5) * 0.01,
      };
    });
  };

  useEffect(() => {
    if (driverLocation) {
      const interval = setInterval(simulateDriverMovement, 5000);
      return () => clearInterval(interval);
    }
  }, [driverLocation]);

  if (loading)
    return <LoadingDisplayComponent message="Loading delivery details..." />;
  if (error)
    return (
      <ErrorDisplayComponent message={error} onRetry={fetchDeliveryDetails} />
    );

  return (
    <View style={styles.container}>
      {driverLocation && (
        <MapView
          style={styles.map}
          region={{
            ...driverLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider="google"
        >
          <Marker
            coordinate={driverLocation}
            title="Driver"
            description="Current driver location"
          />
          {destinationLocation && (
            <Marker
              coordinate={destinationLocation}
              title="Destination"
              description="Delivery destination"
              pinColor="blue"
            />
          )}
        </MapView>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Estimated Arrival: {estimatedArrival}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100,
  },
  infoContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default TrackDriverScreen;
