import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { globalStyles, colors } from "../styles/globalStyles";
import { AuthContext } from "../contexts/AuthContext";
import ErrorDisplayComponent from "../components/ErrorDisplayComponent";
import LoadingDisplayComponent from "../components/LoadingDisplayComponent";
import { getCustomerOrders, getAvailableOrders } from "../api";

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (user.type === "customer") {
        const response = await getCustomerOrders();
        setOrders(response.data);
      } else if (user.type === "driver") {
        const response = await getAvailableOrders();
        setOrders(response.data);
      }
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user.type]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const CustomerView = () => (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate("SetDropOffLocation")}
      >
        <Text style={globalStyles.buttonText}>Request Delivery</Text>
      </TouchableOpacity>
      {orders.length > 0 ? (
        <View>
          <Text style={styles.sectionTitle}>Your Orders:</Text>
          {orders.map((order, index) => (
            <TouchableOpacity
              key={index}
              style={styles.orderButton}
              onPress={() =>
                navigation.navigate("TrackDriver", { orderId: order.id })
              }
            >
              <Text style={globalStyles.buttonText}>Order #{order.id}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.noOrdersText}>You have no active orders.</Text>
      )}
    </ScrollView>
  );

  const DriverView = () => (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
      {orders.length > 0 ? (
        <View>
          <Text style={styles.sectionTitle}>Available Orders:</Text>
          {orders.map((order, index) => (
            <TouchableOpacity
              key={index}
              style={styles.orderButton}
              onPress={() =>
                navigation.navigate("ViewRequests", { orderId: order.id })
              }
            >
              <Text style={globalStyles.buttonText}>Order #{order.id}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.noOrdersText}>
          There are no available orders at the moment.
        </Text>
      )}
    </ScrollView>
  );

  if (loading) return <LoadingDisplayComponent message="Loading..." />;
  if (error)
    return <ErrorDisplayComponent message={error} onRetry={fetchOrders} />;

  return (
    <View style={globalStyles.container}>
      {user.type === "customer" ? <CustomerView /> : <DriverView />}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  welcomeText: {
    ...globalStyles.title,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  orderButton: {
    ...globalStyles.button,
    marginTop: 10,
    backgroundColor: colors.secondary,
  },
  noOrdersText: {
    fontSize: 16,
    color: colors.text,
    marginTop: 20,
    textAlign: "center",
  },
});

export default HomeScreen;