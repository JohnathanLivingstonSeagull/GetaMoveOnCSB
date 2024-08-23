import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { globalStyles, colors } from "../styles/globalStyles";
// Commented out Stripe integration code: * import { CardField, useStripe } from "@stripe/stripe-react-native";

const LinkCardScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { price } = route.params;

  const handlePayment = async () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Payment confirmed");
      navigation.navigate("OrderConfirmation", { ...route.params });
    }, 2000);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Processing payment...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Link Card</Text>
      <Text style={styles.price}>Total: ${price}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: '80%',
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default LinkCardScreen;