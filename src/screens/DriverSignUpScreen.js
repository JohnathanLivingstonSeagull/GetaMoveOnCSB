import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles, colors } from "../styles/globalStyles";

const DriverSignupScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Driver Signup Screen</Text>
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
});

export default DriverSignupScreen;
