import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { globalStyles, colors } from "../styles/globalStyles";

const GOOGLE_MAPS_API_KEY = "AIzaSyBd0sVEWWWTyztYX30VYtToIglg_g4LP4U";

const PickupLocationScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { dropOffLocation, itemType, itemName, itemDescription } = route.params;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleConfirm = () => {
    if (location) {
      navigation.navigate("OrderSummary", {
        dropOffLocation,
        pickupLocation: location,
        itemType,
        itemName,
        itemDescription,
      });
    } else {
      setErrorMsg("Please select a pickup location");
    }
  };

  return (
    <View style={globalStyles.container}>
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      <GooglePlacesAutocomplete
        placeholder="Search for pickup location"
        onPress={(data, details = null) => {
          setLocation({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.autocompleteInput,
        }}
      />
      {location && (
        <MapView style={styles.map} region={location} provider="google">
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            draggable
            onDragEnd={(e) =>
              setLocation({
                ...location,
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              })
            }
          />
        </MapView>
      )}
      <TouchableOpacity style={globalStyles.button} onPress={handleConfirm}>
        <Text style={globalStyles.buttonText}>Confirm Pickup Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  autocompleteContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  autocompleteInput: {
    fontSize: 16,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default PickupLocationScreen;
