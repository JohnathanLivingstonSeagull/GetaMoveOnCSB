import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import { Audio } from "expo-av";

export default function SplashScreen({ navigation }) {
  const bikePosition = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    const playSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/zoom.mp3")
      );
      await sound.playAsync();
    };

    Animated.timing(bikePosition, {
      toValue: 400,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    playSound();

    setTimeout(() => navigation.replace("LoginChoice"), 3000);
  }, [bikePosition, navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      <Animated.Image
        source={require("../assets/bicycle-man.png")}
        style={[styles.bicycle, { transform: [{ translateX: bikePosition }] }]}
      />
      <Text style={styles.appName}>APP NAME</Text>
      <Text style={styles.subtext}>Forgot it? We've got it sorted!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  bicycle: {
    width: 100,
    height: 100,
    position: "absolute",
    top: "40%",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#333333",
    marginTop: 20,
  },
  subtext: {
    fontSize: 18,
    color: "#333333",
    marginTop: 10,
  },
});
