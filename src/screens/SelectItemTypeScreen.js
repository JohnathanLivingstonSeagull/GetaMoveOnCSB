import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SelectItemTypeScreen = ({ navigation, route }) => {
  const [itemType, setItemType] = useState("");
  const { dropOffLocation } = route.params;

  const handleContinue = () => {
    if (itemType) {
      navigation.navigate("SelectItem", { dropOffLocation, itemType });
    } else {
      alert("Please select an item type");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Item Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={itemType}
          onValueChange={(itemValue) => setItemType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select item type" value="" />
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Electronics" value="electronics" />
          <Picker.Item label="Documents" value="documents" />
          <Picker.Item label="Miscellaneous" value="miscellaneous" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pickerContainer: {
    width: 358,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  picker: {
    width: 358,
    height: 48,
  },
  button: {
    width: 358,
    height: 48,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SelectItemTypeScreen;
