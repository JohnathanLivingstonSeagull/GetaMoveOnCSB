import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HomeScreen = ({ navigation, route }) => {
  const { userType } = route.params;

  const CustomerView = () => (
    <View>
      <Text style={styles.welcomeText}>Welcome, Customer!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SetDropOffLocation")}
      >
        <Text style={styles.buttonText}>Request Delivery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TrackDriver")}
      >
        <Text style={styles.buttonText}>Track Current Delivery</Text>
      </TouchableOpacity>
    </View>
  );

  const DriverView = () => (
    <View>
      <Text style={styles.welcomeText}>Welcome, Driver!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ViewRequests")}
      >
        <Text style={styles.buttonText}>View Delivery Requests</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Directions")}
      >
        <Text style={styles.buttonText}>Current Delivery</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {userType === "customer" ? <CustomerView /> : <DriverView />}
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
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: 358,
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

export default HomeScreen;
