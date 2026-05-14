import { useFocusEffect } from "@react-navigation/native";

import React, { useEffect, useState } from "react";



import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Reports() {
  const [data, setData] = useState<any[]>(
    []
  );

  useFocusEffect(
  React.useCallback(() => {
    loadData();
  }, [])
);

  const loadData = async () => {
    const saved = await AsyncStorage.getItem(
      "entries"
    );

    if (saved) {
      setData(JSON.parse(saved));
    }
  };

  const totalEarning = data.reduce(
    (a, b) => a + b.total,
    0
  );

  const totalReceived = data.reduce(
    (a, b) => a + b.received,
    0
  );

  const totalPending =
    totalEarning - totalReceived;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Reports
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.label}>
            Total Earning
          </Text>

          <Text style={styles.amount}>
            ₹{totalEarning}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Total Received
          </Text>

          <Text style={styles.amount}>
            ₹{totalReceived}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Total Pending
          </Text>

          <Text style={styles.amount}>
            ₹{totalPending}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  /* ================= MAIN CONTAINER ================= */

  container: {
    flex: 1,

    backgroundColor: "#f5f5f5",

    // TOP SPACE
    paddingTop: 52,

    // SIDE SPACE
    paddingHorizontal: 16,
  },

  /* ================= SCREEN TITLE ================= */

  heading: {

    // TITLE SIZE CHANGE HERE
    fontSize: 32,

    fontWeight: "900",

    marginBottom: 22,

    color: "#000",
  },

  /* ================= REPORT CARD ================= */

  card: {
    backgroundColor: "#000",

    // CARD ROUNDNESS
    borderRadius: 26,

    // CARD INNER SPACE
    padding: 22,

    // GAP BETWEEN CARDS
    marginBottom: 18,

    // CARD HEIGHT
    minHeight: 135,

    justifyContent: "center",

    elevation: 3,
  },

  /* ================= SMALL LABEL ================= */

  label: {

    // SMALL TEXT SIZE
    fontSize: 15,

    color: "#9a9a9a",

    fontWeight: "700",

    marginBottom: 14,
  },

  /* ================= BIG ₹ AMOUNT ================= */

  amount: {

    // BIG AMOUNT SIZE
    fontSize: 40,

    color: "#fff",

    fontWeight: "900",
  },
});