import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const OrderConfirmationScreen = ({ navigation, route }) => {
  const { price } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Confirmed!</Text>
      <Text style={styles.message}>
        Your payment of ${price} has been processed successfully.
      </Text>
      <Text style={styles.message}>
        A driver will be assigned to your delivery shortly.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TrackDriver")}
      >
        <Text style={styles.buttonText}>Track Your Delivery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default OrderConfirmationScreen;
