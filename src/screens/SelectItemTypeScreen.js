import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Make sure to install this package

export default function SelectItemTypeScreen({ navigation, route }) {
  const [itemType, setItemType] = useState("");

  const handleContinue = () => {
    navigation.navigate("SelectItemScreen", { ...route.params, itemType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Item Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={itemType}
          onValueChange={(value) => setItemType(value)}
        >
          <Picker.Item label="Select Item Type" value="" />
          <Picker.Item label="Document" value="document" />
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Clothing" value="clothing" />
          <Picker.Item label="Electronics" value="electronics" />
          <Picker.Item label="Miscellaneous" value="miscellaneous" />
        </Picker>
      </View>
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
  pickerContainer: {
    width: "100%",
    height: 48,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 20,
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
