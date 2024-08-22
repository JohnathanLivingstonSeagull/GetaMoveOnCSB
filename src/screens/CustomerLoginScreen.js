import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import { globalStyles, colors } from "../styles/globalStyles";

const CustomerLoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(route.params?.isSignup || false);
  const { login } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      let userCredential;
      if (isSignup) {
        if (!name) {
          Alert.alert("Error", "Please enter your name");
          return;
        }
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Here you would typically save additional user info to your database
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      const userData = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: name || userCredential.user.displayName,
        role: "customer",
      };

      await login(userData);
      navigation.navigate("Home", { userType: "customer" });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[globalStyles.title, styles.centerText]}>
          {isSignup ? "Sign Up" : "Login"}
        </Text>
        {isSignup && (
          <TextInput
            style={globalStyles.input}
            placeholder="Name"
            placeholderTextColor={colors.border}
            value={name}
            onChangeText={setName}
          />
        )}
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          placeholderTextColor={colors.border}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          placeholderTextColor={colors.border}
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
          <Text style={[globalStyles.linkText, styles.centerText]}>
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  centerText: {
    textAlign: "center",
  },
});

export default CustomerLoginScreen;
