import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { router } from "expo-router";

export default function SplashScreen() {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tab)");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image
        source={require("../assets/splash-icon.png")}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});