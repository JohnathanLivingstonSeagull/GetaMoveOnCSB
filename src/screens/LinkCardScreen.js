import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";

export default function LinkCardScreen({ navigation, route }) {
  const [cardDetails, setCardDetails] = useState({});
  const stripe = useStripe();

  const handleContinue = async () => {
    if (!cardDetails.complete) {
      alert("Please enter complete card details");
      return;
    }

    // Assuming you have a backend server to handle payment intents
    const response = await fetch(
      "your-backend-server.com/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodType: "card",
        }),
      }
    );

    const { clientSecret } = await response.json();

    const { error } = await stripe.confirmPayment(clientSecret, {
      type: "Card",
      billingDetails: {},
    });

    if (error) {
      alert(error.message);
    } else {
      navigation.navigate("TrackDriverScreen", { ...route.params });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Card Details</Text>
      <CardField
        postalCodeEnabled={true}
        placeholders={{ number: "4242 4242 4242 4242" }}
        cardStyle={styles.cardField}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  cardContainer: {
    width: "100%",
    height: 48,
    marginBottom: 20,
  },
  cardField: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    height: "100%",
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
