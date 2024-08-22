import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const LoadingDisplayComponent = ({ message = "Loading..." }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#4A90E2" />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default LoadingDisplayComponent;
