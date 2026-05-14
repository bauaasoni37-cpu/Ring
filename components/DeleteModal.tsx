import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Modal from "react-native-modal";

import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;

  onClose: () => void;

  onDelete: () => void;

  size: string;
};

export default function DeleteModal({
  visible,
  onClose,
  onDelete,
  size,
}: Props) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.35}
      style={styles.modal}
    >
      <View style={styles.container}>
        {/* ================= ICON ================= */}

        <View style={styles.iconCircle}>
          <Ionicons
            name="trash-outline"
            size={34}
            color="#000"
          />
        </View>

        {/* ================= TITLE ================= */}

        <Text style={styles.title}>
          Delete Entry
        </Text>

        {/* ================= SIZE ================= */}

        <View style={styles.sizeBox}>
          <Text style={styles.sizeText}>
            SIZE {size}
          </Text>
        </View>

        {/* ================= SUB TEXT ================= */}

        <Text style={styles.subText}>
          This action cannot be undone.
        </Text>

        {/* ================= BUTTONS ================= */}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.cancelBtn}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.deleteBtn}
            onPress={onDelete}
          >
            <Text style={styles.deleteText}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,

    justifyContent: "center",

    alignItems: "center",
  },

  /* ================= MAIN BOX ================= */

  container: {
    width: 330,

    backgroundColor: "#fff",

    borderRadius: 34,

    paddingHorizontal: 24,

    paddingTop: 28,

    paddingBottom: 22,

    alignItems: "center",
  },

  /* ================= ICON CIRCLE ================= */

  iconCircle: {
    width: 74,

    height: 74,

    borderRadius: 100,

    backgroundColor: "#f5f5f5",

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 18,
  },

  /* ================= TITLE ================= */

  title: {
    fontSize: 24,

    fontWeight: "900",

    color: "#000",

    marginBottom: 14,
  },

  /* ================= SIZE BOX ================= */

  sizeBox: {
    backgroundColor: "#000",

    borderRadius: 100,

    paddingHorizontal: 18,

    paddingVertical: 10,

    marginBottom: 14,
  },

  sizeText: {
    color: "#fff",

    fontWeight: "800",

    fontSize: 14,
  },

  /* ================= SUB TEXT ================= */

  subText: {
    fontSize: 14,

    color: "#666",

    marginBottom: 24,

    textAlign: "center",
  },

  /* ================= BUTTON ROW ================= */

  buttonRow: {
    flexDirection: "row",

    gap: 12,

    width: "100%",
  },

  /* ================= CANCEL BUTTON ================= */

  cancelBtn: {
    flex: 1,

    height: 54,

    borderRadius: 100,

    backgroundColor: "#f3f3f3",

    justifyContent: "center",

    alignItems: "center",
  },

  cancelText: {
    fontSize: 15,

    fontWeight: "700",

    color: "#000",
  },

  /* ================= DELETE BUTTON ================= */

  deleteBtn: {
    flex: 1,

    height: 54,

    borderRadius: 100,

    backgroundColor: "#000",

    justifyContent: "center",

    alignItems: "center",
  },

  deleteText: {
    fontSize: 15,

    fontWeight: "800",

    color: "#fff",
  },
});