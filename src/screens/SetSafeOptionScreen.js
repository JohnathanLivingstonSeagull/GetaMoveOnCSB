import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


export default function SetSafeOptionScreen({ navigation, route }) {
  const [requiresSafe, setRequiresSafe] = useState(false);
  const [safeCode, setSafeCode] = useState("");

  const handleSafeOption = (option) => {
    setRequiresSafe(option);
  };

  const handleContinue = () => {
    navigation.navigate("PickupLocationScreen", {
      ...route.params,
      requiresSafe,
      safeCode,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Does the item require a safe?</Text>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          !requiresSafe ? styles.selectedButton : null,
        ]}
        onPress={() => handleSafeOption(false)}
      >
        <Text style={styles.buttonText}>No</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          requiresSafe ? styles.selectedButton : null,
        ]}
        onPress={() => handleSafeOption(true)}
      >
        <Text style={styles.buttonText}>Yes</Text>
      </TouchableOpacity>

      {requiresSafe && (
        <TextInput
          style={styles.input}
          placeholder="Set Safe Code"
          value={safeCode}
          onChangeText={setSafeCode}
          secureTextEntry
          keyboardType="numeric"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  toggleButton: {
    width: "40%",
    height: 48,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: "#3658A8",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
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
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
});
