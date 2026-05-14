import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";

type Props = {
  title: string;

  onPress: () => void;

  dark?: boolean;

  style?: ViewStyle;
};

export default function AppButton({
  title,
  onPress,
  dark = false,
  style,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.button,

        dark
          ? styles.darkButton
          : styles.lightButton,

        style,
      ]}
    >
      <Text
        style={[
          styles.text,

          dark
            ? styles.darkText
            : styles.lightText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,

    /* ================= HEIGHT CONTROL ================= */
    // button kitna lamba hoga
    height: 45,

    /* ================= ROUNDNESS CONTROL ================= */
    // button corners
    borderRadius: 20,

    justifyContent: "center",

    alignItems: "center",
  },

  darkButton: {
    backgroundColor: "#000",
  },

  lightButton: {
    backgroundColor: "#f3f3f3",
  },

  text: {
    /* ================= TEXT SIZE CONTROL ================= */
    // button text size
    fontSize: 17,

    fontWeight: "700",
  },

  darkText: {
    color: "#fff",
  },

  lightText: {
    color: "#000",
  },
});