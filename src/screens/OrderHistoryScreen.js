import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ErrorDisplayComponent } from "../../ErrorDisplayComponent";
import { LoadingDisplayComponent } from "../../LoadingdisplayComponents";

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      // In a real app, you would fetch order history from your backend
      // For now, we'll use mock data and simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockOrders = [
        { id: "1", date: "2023-05-01", status: "Delivered", total: "$25.99" },
        { id: "2", date: "2023-04-28", status: "Delivered", total: "$18.50" },
        { id: "3", date: "2023-04-22", status: "Cancelled", total: "$32.75" },
        // Add more mock orders as needed
      ];
      setOrders(mockOrders);
    } catch (err) {
      setError("Failed to load order history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => navigation.navigate("OrderDetails", { orderId: item.id })}
    >
      <Text style={styles.orderDate}>{item.date}</Text>
      <Text style={styles.orderStatus}>{item.status}</Text>
      <Text style={styles.orderTotal}>{item.total}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingDisplayComponent message="Loading order history..." />;
  }

  if (error) {
    return (
      <ErrorDisplayComponent message={error} onRetry={fetchOrderHistory} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  orderItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderDate: {
    fontSize: 16,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderTotal: {
    fontSize: 16,
    color: "#4A90E2",
  },
});

export default OrderHistoryScreen;
