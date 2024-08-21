import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MainSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("LoginChoice", { userType: "customer" })
        }
      >
        <Text style={styles.buttonText}>Get it Delivered</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("LoginChoice", { userType: "driver" })
        }
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
    backgroundColor: "#ffffff",
    padding: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    width: 358,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MainSelectionScreen;
