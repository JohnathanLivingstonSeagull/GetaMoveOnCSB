import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ConfirmDropOffScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const { deliveryId } = route.params;

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleConfirmDropOff = async () => {
    if (!image) {
      Alert.alert("Error", "Please take a photo of the delivered item");
      return;
    }

    try {
      // Here you would typically upload the image to your server
      // and update the delivery status in your backend

      // For now, we'll just simulate a successful API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Success", "Delivery confirmed", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to confirm delivery. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Drop-off</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Take Photo of Delivered Item</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, !image && styles.disabledButton]}
        onPress={handleConfirmDropOff}
        disabled={!image}
      >
        <Text style={styles.buttonText}>Confirm Drop-off</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConfirmDropOffScreen;
