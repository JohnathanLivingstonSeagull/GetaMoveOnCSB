import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { globalStyles, colors } from "../styles/globalStyles";
import ErrorDisplayComponent from "../components/ErrorDisplayComponent";
import LoadingDisplayComponent from "../components/LoadingDisplayComponent";
import { createOrder } from "../api";

const OrderSummaryScreen = ({ navigation, route }) => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    dropOffLocation,
    pickupLocation,
    itemType,
    itemName,
    itemDescription,
  } = route.params;

  useEffect(() => {
    calculatePrice();
  }, []);

  const calculatePrice = () => {
    // placeholder because i didnt have enough time to build the logic
    setLoading(true);
    setTimeout(() => {
      const calculatedPrice = (Math.random() * 15 + 5).toFixed(2);
      setPrice(calculatedPrice);
      setLoading(false);
    }, 1000);
  };

  const handleConfirmOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const orderData = {
        dropOffLocation,
        pickupLocation,
        itemType,
        itemName,
        itemDescription,
        price,
      };
      const response = await createOrder(orderData);
      navigation.navigate("OrderConfirmation", { orderId: response.data.id });
    } catch (err) {
      setError("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingDisplayComponent message="Processing..." />;
  if (error) return <ErrorDisplayComponent message={error} onRetry={calculatePrice} />;

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Order Summary</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Item: {itemName}</Text>
        <Text style={styles.detailText}>Type: {itemType}</Text>
        <Text style={styles.detailText}>Description: {itemDescription}</Text>
        <Text style={styles.detailText}>Pickup: {pickupLocation.address}</Text>
        <Text style={styles.detailText}>Drop-off: {dropOffLocation.address}</Text>
        <Text style={[styles.detailText, styles.priceText]}>Price: ${price}</Text>
      </View>
      <TouchableOpacity style={globalStyles.button} onPress={handleConfirmOrder}>
        <Text style={globalStyles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: colors.border,
    borderWidth: 1,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.text,
  },
  priceText: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: 18,
  },
});

export default OrderSummaryScreen;