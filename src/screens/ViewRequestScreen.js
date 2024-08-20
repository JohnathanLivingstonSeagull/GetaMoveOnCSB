import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function ViewRequestsScreen({ navigation }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests from the backend (Mock data for now)
    setRequests([
      { id: "1", item: "Package", location: "123 Main St", fee: 10 },
      { id: "2", item: "Document", location: "456 Elm St", fee: 5 },
    ]);
  }, []);

  const handleAccept = (request) => {
    navigation.navigate("ItemDetailsScreen", { request });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Item: {item.item}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Fee: ${item.fee}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAccept(item)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});
