import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginChoiceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FA7454" }]}
        onPress={() => navigation.navigate("CustomerLogin")}
      >
        <Text style={styles.buttonText}>Get it Delivered</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4A90E2" }]}
        onPress={() => navigation.navigate("DriverLogin")}
      >
        <Text style={styles.buttonText}>Deliver an Item</Text>
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
    width: 358,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
