import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { globalStyles, colors } from "../styles/globalStyles";

const SelectItemScreen = ({ navigation, route }) => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const { dropOffLocation, itemType } = route.params;

  const handleContinue = () => {
    if (itemName && itemDescription) {
      navigation.navigate("PickupLocation", {
        dropOffLocation,
        itemType,
        itemName,
        itemDescription,
      });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Item Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
        placeholderTextColor={colors.border}
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Item Description"
        value={itemDescription}
        onChangeText={setItemDescription}
        multiline
        numberOfLines={4}
        placeholderTextColor={colors.border}
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleContinue}>
        <Text style={globalStyles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    ...globalStyles.input,
    marginBottom: 20,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 10,
  },
});

export default SelectItemScreen;
