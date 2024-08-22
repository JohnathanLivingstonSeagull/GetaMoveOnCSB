import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const CustomerView = () => (
    <View>
      <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
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
      <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
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

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginChoice" }],
    });
  };

  return (
    <View style={styles.container}>
      {user.role === "customer" ? <CustomerView /> : <DriverView />}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
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
  logoutButton: {
    width: 358,
    height: 48,
    backgroundColor: "#FA7454",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
