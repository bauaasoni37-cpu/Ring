import React from "react";

import {
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  title: string;
};

export default function SectionTitle({
  title,
}: Props) {
  return (
    <Text style={styles.title}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    /* ================= TEXT SIZE CONTROL ================= */
    // heading text size
    fontSize: 20,

    fontWeight: "bold",

    textAlign: "center",

    color: "#000",

    /* ================= BOTTOM GAP CONTROL ================= */
    // niche ka distance
    marginBottom: 22,
  },
});