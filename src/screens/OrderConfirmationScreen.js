import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles, colors } from "../styles/globalStyles";
import ErrorDisplayComponent from "../components/ErrorDisplayComponent";
import LoadingDisplayComponent from "../components/LoadingDisplayComponent";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { globalStyles, colors } from "../styles/globalStyles";

const OrderConfirmationScreen = ({ navigation, route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          setOrderDetails(orderSnap.data());
        } else {
          setError("Order not found");
        }
      } catch (err) {
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading)
    return <LoadingDisplayComponent message="Loading order details..." />;
  if (error) return <ErrorDisplayComponent message={error} />;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Order Confirmed!</Text>
      {orderDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Order ID: {orderId}</Text>
          <Text style={styles.detailText}>Item: {orderDetails.itemName}</Text>
          <Text style={styles.detailText}>Price: ${orderDetails.price}</Text>
          <Text style={styles.detailText}>Status: {orderDetails.status}</Text>
          <Text style={styles.detailText}>
            Pickup: {orderDetails.pickupLocation.address}
          </Text>
          <Text style={styles.detailText}>
            Drop-off: {orderDetails.dropOffLocation.address}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate("TrackDriver", { orderId })}
      >
        <Text style={globalStyles.buttonText}>Track Your Delivery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 8,
    marginVertical: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default OrderConfirmationScreen;
