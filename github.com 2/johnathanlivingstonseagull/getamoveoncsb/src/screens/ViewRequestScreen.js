import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { globalStyles, colors } from "../styles/globalStyles";
import ErrorDisplayComponent from "../components/ErrorDisplayComponent";
import LoadingDisplayComponent from "../components/LoadingDisplayComponent";
import { doc, onSnapshot } from "expo-firebase-firestore";
import { auth, db } from '../config/firebaseConfig';
import * as firebaseServices from '../services/firebaseServices';


const { width, height } = Dimensions.get("window");

const GOOGLE_MAPS_API_KEY = "AIzaSyBd0sVEWWWTyztYX30VYtToIglg_g4LP4U";

const TrackDriverScreen = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const orderRef = doc(db, "orders", orderId);
    const unsubscribe = onSnapshot(
      orderRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setOrderDetails(data);
          if (data.driverLocation) {
            setDriverLocation({
              latitude: data.driverLocation.latitude,
              longitude: data.driverLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }
          setLoading(false);
        } else {
          setError("Order not found");
          setLoading(false);
        }
      },
      (err) => {
        setError("Failed to fetch order details");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [orderId]);

  if (loading)
    return <LoadingDisplayComponent message="Loading order details..." />;
  if (error) return <ErrorDisplayComponent message={error} />;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Track Your Order</Text>
      {driverLocation && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={driverLocation}
          customMapStyle={[]} // Add custom map style if time allows
        >
          <Marker
            coordinate={{
              latitude: driverLocation.latitude,
              longitude: driverLocation.longitude,
            }}
            title="Driver"
            description="Current driver location"
          />
          {orderDetails && orderDetails.dropOffLocation && (
            <Marker
              coordinate={{
                latitude: orderDetails.dropOffLocation.latitude,
                longitude: orderDetails.dropOffLocation.longitude,
              }}
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
