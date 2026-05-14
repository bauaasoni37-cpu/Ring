import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  title: string;

  onPress: () => void;
};

export default function DateButton({
  title,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    /* ================= WIDTH CONTROL ================= */
    // date button kitna choda hoga
    width: 280,

    /* ================= HEIGHT CONTROL ================= */
    // date button kitna lamba hoga
    height: 50,

    backgroundColor: "#f3f3f3",

    /* ================= ROUNDNESS CONTROL ================= */
    borderRadius: 22,

    justifyContent: "center",

    /* ================= LEFT RIGHT INNER SPACE ================= */
    paddingHorizontal: 35,

    /* ================= BOTTOM GAP CONTROL ================= */
    marginBottom: 8,
  },

  text: {
    /* ================= TEXT SIZE CONTROL ================= */
    fontSize: 16,

    fontWeight: "700",

    color: "#000",
  },
});