import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { globalStyles, colors } from "../styles/globalStyles";
import ErrorDisplayComponent from "../components/ErrorDisplayComponent";
import LoadingDisplayComponent from "../components/LoadingDisplayComponent";
import { getOrderDetails } from "../api";

const { width, height } = Dimensions.get("window");

const GOOGLE_MAPS_API_KEY = "AIzaSyBd0sVEWWWTyztYX30VYtToIglg_g4LP4U";

const TrackDriverScreen = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
    const intervalId = setInterval(simulateDriverMovement, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await getOrderDetails(orderId);
      setOrderDetails(response.data);
      // Initialize driver location as pickup location for this example
      setDriverLocation(response.data.pickupLocation);
    } catch (err) {
      setError("Failed to fetch order details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const simulateDriverMovement = () => {
    if (driverLocation) {
      setDriverLocation((prevLocation) => ({
        latitude: prevLocation.latitude + (Math.random() - 0.5) * 0.001,
        longitude: prevLocation.longitude + (Math.random() - 0.5) * 0.001,
      }));
    }
  };

  if (loading)
    return <LoadingDisplayComponent message="Loading order details..." />;
  if (error)
    return (
      <ErrorDisplayComponent message={error} onRetry={fetchOrderDetails} />
    );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Track Your Order</Text>
      {driverLocation && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            ...driverLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={[]} // You can add custom map styles here
        >
          <Marker
            coordinate={driverLocation}
            title="Driver"
            description="Current driver location"
          />
          {orderDetails && (
            <Marker
              coordinate={orderDetails.dropOffLocation}
              title="Destination"
              description="Drop-off location"
              pinColor={colors.secondary}
            />
          )}
        </MapView>
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Order ID: {orderId}</Text>
        <Text style={styles.detailText}>
          Status: {orderDetails?.status || "N/A"}
        </Text>
        <Text style={styles.detailText}>
          Estimated Arrival:{" "}
          {orderDetails?.estimatedArrival || "Calculating..."}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: width,
    height: height * 0.6,
  },
  detailsContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TrackDriverScreen;
