import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      if (user.type === 'customer') {
        const response = await getCustomerOrders();
        setOrders(response.data);
      } else if (user.type === 'driver') {
        const response = await getAvailableOrders();
        setOrders(response.data);
      }
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const CustomerView = () => (
    <ScrollView>
      <Text style={globalStyles.title}>Welcome, {user.name}!</Text>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate("SetDropOffLocation")}
      >
        <Text style={globalStyles.buttonText}>Request Delivery</Text>
      </TouchableOpacity>
      {orders.length > 0 ? (
        <View>
          <Text style={[globalStyles.title, { fontSize: 20, marginTop: 20 }]}>Your Orders:</Text>
          {orders.map((order, index) => (
            <TouchableOpacity 
              key={index}
              style={[globalStyles.button, { marginTop: 10, backgroundColor: colors.secondary }]}
              onPress={() => navigation.navigate("TrackDriver", { orderId: order.id })}
            >
              <Text style={globalStyles.buttonText}>Order #{order.id}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>You have no active orders.</Text>
      )}
    </ScrollView>
  );

  const DriverView = () => (
    <ScrollView>
      <Text style={globalStyles.title}>Welcome, {user.name}!</Text>
      {orders.length > 0 ? (
        <View>
          <Text style={[globalStyles.title, { fontSize: 20, marginTop: 20 }]}>Available Orders:</Text>
          {orders.map((order, index) => (
            <TouchableOpacity 
              key={index}
              style={[globalStyles.button, { marginTop: 10, backgroundColor: colors.secondary }]}
              onPress={() => navigation.navigate("ViewRequests", { orderId: order.id })}
            >
              <Text style={globalStyles.buttonText}>Order #{order.id}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>There are no available orders at the moment.</Text>
      )}
    </ScrollView>
  );

  if (loading) return <LoadingDisplayComponent message="Loading..." />;
  if (error) return <ErrorDisplayComponent message={error} onRetry={fetchOrders} />;

  return (
    <View style={globalStyles.container}>
      {user.type === "customer" ? <CustomerView /> : <DriverView />}
    </View>
  );
};

export default HomeScreen;