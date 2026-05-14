import { router } from "expo-router";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  RefreshControl,
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";

import AppModal from "../../components/AppModal";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import SectionTitle from "../../components/SectionTitle";
import DateButton from "../../components/DateButton";

import DeleteModal from "../../components/DeleteModal";

export default function Home() {
  const [visible, setVisible] =
    useState(false);

  const [done, setDone] =
    useState(false);

  const [data, setData] = useState<any[]>(
    []
  );

  const [refreshing, setRefreshing] =
    useState(false);

  const [showPicker, setShowPicker] =
    useState(false);

  const [date, setDate] = useState(
    new Date()
  );

  const [size, setSize] = useState("");

  const [pieces, setPieces] =
    useState("");

  const [price, setPrice] = useState("");

  const [received, setReceived] =
    useState("");

  /* ================= DELETE MODAL ================= */

  const [deleteVisible, setDeleteVisible] =
    useState(false);

  const [
    selectedSizeData,
    setSelectedSizeData,
  ] = useState<any[]>([]);

  const [selectedSize, setSelectedSize] =
    useState("");

  const piecesRef =
    useRef<TextInput>(null);

  const priceRef =
    useRef<TextInput>(null);

  const receivedRef =
    useRef<TextInput>(null);

  useEffect(() => {
    loadData();
  }, []);

  /* ================= LOAD DATA ================= */

  const loadData = async () => {
    try {
      const saved =
        await AsyncStorage.getItem(
          "entries"
        );

      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= SAVE DATA ================= */

  const saveData = async (
    items: any[]
  ) => {
    try {
      await AsyncStorage.setItem(
        "entries",
        JSON.stringify(items)
      );
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= REFRESH ================= */

  const onRefresh = async () => {
    setRefreshing(true);

    await loadData();

    setTimeout(() => {
      setRefreshing(false);
    }, 700);
  };

  /* ================= DATE FORMAT ================= */

  const formattedDate =
    date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  /* ================= RESET ================= */

  const resetFields = () => {
    setSize("");

    setPieces("");

    setPrice("");

    setReceived("");
  };

  /* ================= ADD ENTRY ================= */

  const addEntry = async () => {
    if (
      !size ||
      !pieces ||
      !price ||
      !received
    ) {
      alert("Fill all fields");

      return;
    }

    const total =
      Number(pieces) * Number(price);

    const item = {
      id: Date.now().toString(),

      date: formattedDate,

      size: size.toUpperCase(),

      pieces: Number(pieces),

      price: Number(price),

      total,

      received: Number(received),
    };

    const updated = [item, ...data];

    setData(updated);

    await saveData(updated);

    Keyboard.dismiss();

    resetFields();

    setDone(true);

    setTimeout(() => {
      setDone(false);

      setVisible(false);
    }, 2000);
  };

  /* ================= DELETE ENTRY ================= */

  const handleDelete = async () => {
    const idsToDelete =
      selectedSizeData.map(
        (item) => item.id
      );

    const updated = data.filter(
      (item) =>
        !idsToDelete.includes(item.id)
    );

    setData(updated);

    await saveData(updated);

    setDeleteVisible(false);
  };

  /* ================= GROUP DATA ================= */

  const grouped: any = {};

  data.forEach((item) => {
    if (!grouped[item.date]) {
      grouped[item.date] = {};
    }

    if (!grouped[item.date][item.size]) {
      grouped[item.date][item.size] = [];
    }

    grouped[item.date][item.size].push(
      item
    );
  });

  return (
    <View style={styles.container}>
      {/* ================= HEADING ================= */}

      <Text style={styles.heading}>
        Production
      </Text>

      {/* ================= LIST ================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {Object.keys(grouped).map(
          (dateKey) => {
            const sizeGroups =
              grouped[dateKey];

            const allEntries =
              Object.values(
                sizeGroups
              ).flat() as any[];

            const totalAmount =
              allEntries.reduce(
                (a, b) => a + b.total,
                0
              );

            const totalReceived =
              allEntries.reduce(
                (a, b) => a + b.received,
                0
              );

            return (
              <View key={dateKey}>
                {/* ================= DATE ROW ================= */}

                <View style={styles.dateRow}>
                  <View
                    style={styles.dateBox}
                  >
                    <Text
                      style={
                        styles.dateText
                      }
                    >
                      {dateKey}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.receivedBox
                    }
                  >
                    <Text
                      style={
                        styles.receivedText
                      }
                    >
                      ₹{totalReceived}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.amountBox
                    }
                  >
                    <Text
                      style={
                        styles.amountText
                      }
                    >
                      ₹{totalAmount}
                    </Text>
                  </View>
                </View>

                {/* ================= SIZE CARDS ================= */}

                {Object.keys(sizeGroups).map(
                  (sizeKey) => {
                    const sizeData =
                      sizeGroups[sizeKey];

                    const totalPieces =
                      sizeData.reduce(
                        (
                          a: number,
                          b: any
                        ) =>
                          a + b.pieces,
                        0
                      );

                    const total =
                      sizeData.reduce(
                        (
                          a: number,
                          b: any
                        ) =>
                          a + b.total,
                        0
                      );

                    return (
                      <TouchableOpacity
                        key={sizeKey}
                        style={styles.card}
                        activeOpacity={0.92}

                        /* ================= OPEN REPORT ================= */

                        onPress={() =>
                          router.push(
                            "/reports"
                          )
                        }

                        /* ================= DELETE MODAL ================= */

                        onLongPress={() => {
                          setSelectedSizeData(
                            sizeData
                          );

                          setSelectedSize(
                            sizeKey
                          );

                          setDeleteVisible(
                            true
                          );
                        }}
                      >
                        {/* ================= LEFT SIDE ================= */}

                        <View>
                          <Text
                            style={
                              styles.size
                            }
                          >
                            SIZE {sizeKey}
                          </Text>

                          <Text
                            style={
                              styles.cardAmount
                            }
                          >
                            ₹{total}
                          </Text>
                        </View>

                        {/* ================= RIGHT SIDE ================= */}

                        <Text
                          style={
                            styles.pieces
                          }
                        >
                          {totalPieces} pcs
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>
            );
          }
        )}

        <View style={{ height: 140 }} />
      </ScrollView>

      {/* ================= FLOAT BUTTON ================= */}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fab}
        onPress={() => setVisible(true)}
      >
        <Ionicons
          name="add"
          size={42}
          color="#fff"
        />
      </TouchableOpacity>

      {/* ================= ADD ENTRY MODAL ================= */}

      <AppModal
        visible={visible}
        onClose={() => {
          Keyboard.dismiss();

          setVisible(false);
        }}
      >
        {!done ? (
          <>
            <SectionTitle title="Add Entry" />

            <DateButton
              title={formattedDate}
              onPress={() =>
                setShowPicker(true)
              }
            />

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={(
                  event,
                  selectedDate
                ) => {
                  setShowPicker(false);

                  if (selectedDate) {
                    setDate(
                      selectedDate
                    );
                  }
                }}
              />
            )}

            <AppInput
              placeholder="Enter Size"
              value={size}
              onChangeText={setSize}
              returnKeyType="next"
              onSubmitEditing={() =>
                piecesRef.current?.focus()
              }
            />

            <AppInput
              ref={piecesRef}
              placeholder="Enter Pieces"
              keyboardType="numeric"
              value={pieces}
              onChangeText={setPieces}
              returnKeyType="next"
              onSubmitEditing={() =>
                priceRef.current?.focus()
              }
            />

            <AppInput
              ref={priceRef}
              placeholder="Price Per Piece"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              returnKeyType="next"
              onSubmitEditing={() =>
                receivedRef.current?.focus()
              }
            />

            <AppInput
              ref={receivedRef}
              placeholder="Received Amount"
              keyboardType="numeric"
              value={received}
              onChangeText={setReceived}
              returnKeyType="done"
              onSubmitEditing={
                Keyboard.dismiss
              }
            />

            <View style={styles.buttonRow}>
              <AppButton
                title="Back"
                onPress={() =>
                  setVisible(false)
                }
              />

              <AppButton
                title="Save"
                dark
                onPress={addEntry}
              />
            </View>
          </>
        ) : (
          <View
            style={styles.doneContainer}
          >
            <Ionicons
              name="checkmark-circle"
              size={90}
              color="green"
            />

            <Text style={styles.doneTitle}>
              All Done 👍✅
            </Text>

            <Text style={styles.doneSub}>
              Entry Successfully Added
            </Text>

            <Text
              style={styles.doneSmall}
            >
              Great Work ✨
            </Text>
          </View>
        )}
      </AppModal>

      {/* ================= DELETE MODAL ================= */}

      <DeleteModal
        visible={deleteVisible}
        size={selectedSize}
        onClose={() =>
          setDeleteVisible(false)
        }
        onDelete={handleDelete}
      />
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f5f5f5",

    paddingTop: 52,

    paddingHorizontal: 16,
  },

  heading: {
    fontSize: 32,

    fontWeight: "900",

    marginBottom: 22,

    color: "#000",
  },

  dateRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 14,
  },

  dateBox: {
    backgroundColor: "#000",

    borderRadius: 100,

    paddingHorizontal: 16,

    paddingVertical: 10,
  },

  dateText: {
    fontSize: 13,

    color: "#fff",

    fontWeight: "700",
  },

  receivedBox: {
    backgroundColor: "#dcf4df",

    borderRadius: 100,

    paddingHorizontal: 16,

    paddingVertical: 10,
  },

  receivedText: {
    fontSize: 13,

    color: "green",

    fontWeight: "700",
  },

  amountBox: {
    backgroundColor: "#fff",

    borderRadius: 100,

    paddingHorizontal: 16,

    paddingVertical: 10,
  },

  amountText: {
    fontSize: 13,

    color: "#000",

    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",

    borderRadius: 24,

    padding: 20,

    marginBottom: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    elevation: 3,
  },

  size: {
    fontSize: 22,

    fontWeight: "900",

    color: "#000",
  },

  cardAmount: {
    fontSize: 15,

    color: "#777",

    marginTop: 6,

    fontWeight: "700",
  },

  pieces: {
    fontSize: 22,

    fontWeight: "900",

    color: "#000",
  },

  fab: {
    position: "absolute",

    right: 22,

    bottom: 26,

    width: 70,

    height: 70,

    borderRadius: 100,

    backgroundColor: "#000",

    justifyContent: "center",

    alignItems: "center",

    elevation: 8,
  },

  buttonRow: {
    flexDirection: "row",

    gap: 12,

    marginTop: 6,
  },

  doneContainer: {
    alignItems: "center",

    paddingVertical: 40,
  },

  doneTitle: {
    fontSize: 24,

    fontWeight: "900",

    marginTop: 16,
  },

  doneSub: {
    fontSize: 15,

    color: "#555",

    marginTop: 8,
  },

  doneSmall: {
    fontSize: 14,

    color: "#888",

    marginTop: 6,
  },
});