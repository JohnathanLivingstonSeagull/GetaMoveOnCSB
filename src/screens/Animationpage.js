// Import necessary components and libraries
import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Animated,
  Easing,
} from "react-native";
import { Audio } from "expo-av";

const InitialAnimationScreen = ({ navigation }) => {
  const translateAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const playSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/zoom.mp3')
      );
      await sound.playAsync();
    };

    playSound();

    Animated.timing(translateAnim, {
      toValue: Dimensions.get("window").width,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      setTimeout(() => {
        navigation.navigate("UserSelectionScreen");
      }, 1000);
    });
  }, [translateAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("./assets/roughlogo.jpg")}
        style={[
          styles.logo,
          {
            transform: [{ translateX: translateAnim }],
          },
        ]}
      />
      <Text style={styles.appName}>App Name</Text>
      <Text style={styles.subText}>Forgot it? We've got it sorted!</Text>
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: 20,
  },
  subText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default InitialAnimationScreen;