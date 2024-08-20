import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ConfirmDropOffScreen({ navigation }) {
  const handleComplete = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text>Your delivery is complete! Thank you for using our service.</Text>
      <TouchableOpacity style={styles.button} onPress={handleComplete}>
        <Text style={styles.buttonText}>Back to Home</Text>
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
