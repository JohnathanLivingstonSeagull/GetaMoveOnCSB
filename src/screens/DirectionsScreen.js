import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { decode } from "@mapbox/polyline";
import DriverLocationUpdater from "./DriverLocationUpdater";
import { globalStyles, colors } from "../styles/globalStyles";
import { db } from '../config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const GOOGLE_MAPS_API_KEY = "AIzaSyBd0sVEWWWTyztYX30VYtToIglg_g4LP4U";

const DirectionsScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const fetchOrderDetails = useCallback(async () => {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      setOrder(orderSnap.data());
    } else {
      Alert.alert("Error", "Order not found");
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentLocation && order) {
      fetchDirections();
    }
  }, [currentLocation, order, fetchDirections]);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
  };
  
  const fetchDirections = useCallback(async () => {
    if (!currentLocation || !order) return;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${order.dropOffLocation.latitude},${order.dropOffLocation.longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.routes.length) {
        const points = decode(data.routes[0].overview_polyline.points);
        const coords = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        setRouteCoordinates(coords);
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  }, [currentLocation, order, GOOGLE_MAPS_API_KEY]);

  const handleCompleteDelivery = async () => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: "delivered" });
      Alert.alert("Success", "Delivery marked as complete");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error completing delivery:", error);
      Alert.alert("Error", "Failed to mark delivery as complete");
    }
  };

  if (!currentLocation || !order) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
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
        <Marker coordinate={order.dropOffLocation} title="Drop-off Location" />
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={2}
          strokeColor="red"
        />
      </MapView>
      <TouchableOpacity style={styles.button} onPress={handleCompleteDelivery}>
        <Text style={styles.buttonText}>Complete Delivery</Text>
      </TouchableOpacity>
      <DriverLocationUpdater orderId={orderId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default DirectionsScreen;