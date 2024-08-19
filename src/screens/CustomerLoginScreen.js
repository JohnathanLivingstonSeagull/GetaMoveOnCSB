import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export default function CustomerLoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+44");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const handleGmailLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const sendOTP = async (phoneNumber, otp) => {
    const url = "https://studio-api-eu.ai.vonage.com/messaging/conversation";
    const headers = {
      "Content-Type": "application/json",
      "X-Vgai-Key": "YOUR_ACTUAL_KEY_HERE",
    };
    const body = JSON.stringify({
      to: phoneNumber,
      agent_id: "66c0ec5d5cd447cc0bafda3b",
      channel: "sms",
      status_url: "https://webhook.site/cbfe85bb-967c-4636-8314-ceed512e652d",
      session_parameters: [
        {
          name: "otp",
          value: otp,
        },
      ],
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("OTP sent successfully:", data);
      return data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  };

  const handleManualSignup = async () => {
    if (!showOtp) {
      // Generate and send OTP
      const newOtp = Math.floor(Math.random() * 900000) + 100000;
      setGeneratedOtp(newOtp.toString());
      setShowOtp(true);
      try {
        await sendOTP(phone, newOtp.toString());
        Alert.alert("OTP Sent", "Please check your phone for the OTP");
      } catch (error) {
        Alert.alert("Error", "Failed to send OTP. Please try again.");
      }
    } else {
      // Verify OTP
      if (otp === generatedOtp) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigation.navigate("Home");
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      } else {
        Alert.alert("Error", "Invalid OTP");
      }
    }
  };

  const handleManualLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleGmailLogin}>
        <Text style={styles.buttonText}>Login with Gmail</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {!showOtp && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </>
      )}

      {showOtp && (
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleManualSignup}>
        <Text style={styles.buttonText}>
          {showOtp ? "Verify OTP" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleManualLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#FA7454",
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
