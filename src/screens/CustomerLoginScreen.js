import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { globalStyles, colors } from "../styles/globalStyles";
import { AuthContext } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorDisplayComponent from "../components/ErrorDisplayComponent";
import LoadingDisplayComponent from "../components/LoadingDisplayComponent";
import { login, register } from "../api";

const CustomerLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setUser } = useContext(AuthContext);

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let response;
      if (isSignup) {
        if (!name) {
          setError("Please enter your name");
          setLoading(false);
          return;
        }
        response = await register(name, email, password, "customer");
      } else {
        response = await login(email, password);
      }

      await AsyncStorage.setItem("token", response.data.token);
      setUser({ type: "customer", ...response.data.user });
      navigation.navigate("Home");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingDisplayComponent message="Processing..." />;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>{isSignup ? "Sign Up" : "Login"}</Text>
      {error && <ErrorDisplayComponent message={error} />}
      {isSignup && (
        <TextInput
          style={globalStyles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleAuth}>
        <Text style={globalStyles.buttonText}>
          {isSignup ? "Sign Up" : "Login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <Text
          style={[
            globalStyles.buttonText,
            { color: colors.primary, marginTop: 20 },
          ]}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerLoginScreen;
