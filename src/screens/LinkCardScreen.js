import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { LoadingDisplayComponent } from "../components/LoadingDisplayComponent";
import { ErrorDisplayComponent } from "../components/ErrorDisplayComponent";
import { globalStyles, colors } from "../styles/globalStyles";

const LinkCardScreen = ({ navigation, route }) => {
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { confirmPayment } = useStripe();
  const { price } = route.params;

  const handlePayment = async () => {
    if (!cardDetails?.complete) {
      Alert.alert("Error", "Please enter complete card details");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // In a real app, you would make an API call to your backend to create a PaymentIntent
      // Your backend would then return a client secret
      // For this example, we'll use a dummy client secret
      const clientSecret = "dummy_client_secret";

      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        type: "Card",
        billingDetails: {
          // You can add billing details here if needed
        },
      });

      if (error) {
        throw new Error(error.message);
      } else if (paymentIntent) {
        Alert.alert("Success", "Payment confirmed");
        navigation.navigate("OrderConfirmation", { ...route.params });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingDisplayComponent message="Processing payment..." />;
  }

  if (error) {
    return <ErrorDisplayComponent message={error} onRetry={handlePayment} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Link Card</Text>
      <Text style={styles.price}>Total: ${price}</Text>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => setCardDetails(cardDetails)}
      />
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
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  card: {
    backgroundColor: "#FFFFFF",
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

export default LinkCardScreen;
