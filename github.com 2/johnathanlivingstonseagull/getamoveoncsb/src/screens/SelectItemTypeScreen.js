import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { globalStyles, colors } from "../styles/globalStyles";

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
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Select Item Type</Text>
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
      <TouchableOpacity style={globalStyles.button} onPress={handleContinue}>
        <Text style={globalStyles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default SelectItemTypeScreen;
