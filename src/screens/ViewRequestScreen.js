import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as Location from "expo-location";

const ViewRequestScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNearbyRequests();
  }, []);

  const fetchNearbyRequests = async () => {
    try {
      setLoading(true);
      // Get current location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      // Fetch nearby requests from the backend, edit later
      const response = await fetch(`YOUR_BACKEND_URL/api/nearby-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch nearby requests");
      }

      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await fetch(
        `YOUR_BACKEND_URL/api/accept-request/${requestId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add authentication header here
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept request");
      }

      const data = await response.json();
      navigation.navigate("DirectionsScreen", { requestId: data.requestId });
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading nearby requests...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchNearbyRequests}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.requestItem}>
            <Text>From: {item.pickupLocation}</Text>
            <Text>To: {item.dropOffLocation}</Text>
            <Text>Item: {item.itemName}</Text>
            <Text>Price: ${item.price}</Text>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => handleAcceptRequest(item.id)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  requestItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default ViewRequestScreen;
