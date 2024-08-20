import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const UserSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CustomerSignup")}
      >
        <Text style={styles.buttonText}>Get it Delivered</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DriverSignup")}
      >
        <Text style={styles.buttonText}>Deliver an Item</Text>
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
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 24,
    padding: 14,
    width: 358,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserSelectionScreen;
