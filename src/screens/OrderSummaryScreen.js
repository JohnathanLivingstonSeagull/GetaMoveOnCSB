import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const OrderSummaryScreen = ({ navigation, route }) => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    dropOffLocation,
    pickupLocation,
    itemType,
    itemName,
    itemDescription,
  } = route.params;

  useEffect(() => {
    // In a real app, you would call your backend API here to calculate the price
    // based on the pickup and dropoff locations
    const calculatePrice = () => {
      // Simulating API call with setTimeout
      setTimeout(() => {
        // For now, we'll use a random price between $5 and $20
        const calculatedPrice = (Math.random() * 15 + 5).toFixed(2);
        setPrice(calculatedPrice);
        setLoading(false);
      }, 1500);
    };

    calculatePrice();
  }, [dropOffLocation, pickupLocation]);

  const handleConfirmOrder = () => {
    navigation.navigate("LinkCard", {
      ...route.params,
      price,
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text>Calculating price...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Item: {itemName}</Text>
        <Text style={styles.detailText}>Type: {itemType}</Text>
        <Text style={styles.detailText}>Description: {itemDescription}</Text>
        <Text style={styles.detailText}>Price: ${price}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
        <Text style={styles.buttonText}>Confirm Order</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: 358,
    height: 48,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderSummaryScreen;
