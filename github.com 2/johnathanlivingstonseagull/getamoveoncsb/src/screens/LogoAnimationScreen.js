import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import { Audio } from "expo-av";

const LogoAnimationScreen = ({ navigation }) => {
  const logoPosition = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateLogo = async () => {
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync(require("../assets/zoom.mp3"));
        await sound.playAsync();
      } catch (error) {
        console.error("Error playing sound", error);
      }

      Animated.sequence([
        Animated.timing(logoPosition, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        navigation.replace("MainSelection");
      }, 2500);
    };

    animateLogo();
  }, [fadeAnim, logoPosition, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/roughlogo.jpg")}
        style={[
          styles.logo,
          {
            transform: [{ translateX: logoPosition }],
          },
        ]}
      />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.appName}>Zoorted</Text>
        <Text style={styles.subText}>'Forgot it? We have got it sorted!'</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", //KEEP COLOR
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default LogoAnimationScreen;