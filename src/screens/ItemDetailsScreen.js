import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles, colors } from "../styles/globalStyles";

export default function ItemDetailsScreen({ navigation, route }) {
  const { request } = route.params;

  const handlePickup = () => {
    navigation.navigate("DirectionsScreen", { request });
  };

  return (
    <View style={styles.container}>
      <Text>Item: {request.item}</Text>
      <Text>Location: {request.location}</Text>
      <Text>Fee: ${request.fee}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePickup}>
        <Text style={styles.buttonText}>Proceed to Pickup</Text>
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
  button: {
    marginTop: 20,
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});
