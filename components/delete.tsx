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
      swipeDirection="down"
      onSwipeComplete={onClose}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropOpacity={0.45}
      useNativeDriver
      hideModalContentWhileAnimating
      style={styles.modal}
    >
      <View style={styles.container}>
        {/* ================= TOP HANDLE ================= */}

        <View style={styles.handle} />

        {/* ================= ICON ================= */}

        <View style={styles.iconWrapper}>
          <View style={styles.iconGlow} />

          <View style={styles.iconCircle}>
            <Ionicons
              name="trash"
              size={34}
              color="#ff3b30"
            />
          </View>
        </View>

        {/* ================= TITLE ================= */}

        <Text style={styles.title}>
          Delete Entry
        </Text>

        {/* ================= SUB TITLE ================= */}

        <Text style={styles.subtitle}>
          Are you sure you want to remove
          this production entry?
        </Text>

        {/* ================= SIZE BOX ================= */}

        <View style={styles.sizeBox}>
          <Ionicons
            name="cube-outline"
            size={16}
            color="#fff"
          />

          <Text style={styles.sizeText}>
            SIZE {size}
          </Text>
        </View>

        {/* ================= WARNING BOX ================= */}

        <View style={styles.warningBox}>
          <Ionicons
            name="alert-circle"
            size={18}
            color="#ff9500"
          />

          <Text style={styles.warningText}>
            This action cannot be undone
          </Text>
        </View>

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
            <Ionicons
              name="trash-outline"
              size={18}
              color="#fff"
            />

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
  /* ================= MODAL ================= */

  modal: {
    margin: 0,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 18,
  },

  /* ================= MAIN CONTAINER ================= */

  container: {
    width: "100%",

    maxWidth: 360,

    backgroundColor: "#fff",

    borderRadius: 36,

    paddingTop: 18,

    paddingBottom: 24,

    paddingHorizontal: 22,

    alignItems: "center",

    elevation: 15,
  },

  /* ================= HANDLE ================= */

  handle: {
    width: 56,

    height: 5,

    borderRadius: 100,

    backgroundColor: "#dcdcdc",

    marginBottom: 22,
  },

  /* ================= ICON AREA ================= */

  iconWrapper: {
    justifyContent: "center",

    alignItems: "center",

    marginBottom: 20,
  },

  iconGlow: {
    position: "absolute",

    width: 100,

    height: 100,

    borderRadius: 100,

    backgroundColor: "#ffe9e7",
  },

  iconCircle: {
    width: 78,

    height: 78,

    borderRadius: 100,

    backgroundColor: "#fff5f4",

    justifyContent: "center",

    alignItems: "center",

    borderWidth: 1.5,

    borderColor: "#ffd7d3",
  },

  /* ================= TITLE ================= */

  title: {
    fontSize: 28,

    fontWeight: "900",

    color: "#111",

    marginBottom: 10,

    letterSpacing: 0.3,
  },

  /* ================= SUBTITLE ================= */

  subtitle: {
    fontSize: 15,

    color: "#666",

    textAlign: "center",

    lineHeight: 22,

    paddingHorizontal: 10,

    marginBottom: 20,
  },

  /* ================= SIZE BOX ================= */

  sizeBox: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,

    backgroundColor: "#111",

    paddingHorizontal: 20,

    paddingVertical: 12,

    borderRadius: 100,

    marginBottom: 18,
  },

  sizeText: {
    color: "#fff",

    fontSize: 15,

    fontWeight: "800",

    letterSpacing: 0.5,
  },

  /* ================= WARNING BOX ================= */

  warningBox: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    backgroundColor: "#fff8eb",

    borderRadius: 18,

    paddingVertical: 14,

    paddingHorizontal: 14,

    marginBottom: 26,
  },

  warningText: {
    color: "#9a6700",

    fontSize: 14,

    fontWeight: "600",
  },

  /* ================= BUTTON ROW ================= */

  buttonRow: {
    flexDirection: "row",

    width: "100%",

    gap: 12,
  },

  /* ================= CANCEL BUTTON ================= */

  cancelBtn: {
    flex: 1,

    height: 58,

    borderRadius: 100,

    backgroundColor: "#f3f3f3",

    justifyContent: "center",

    alignItems: "center",
  },

  cancelText: {
    fontSize: 15,

    fontWeight: "800",

    color: "#222",
  },

  /* ================= DELETE BUTTON ================= */

  deleteBtn: {
    flex: 1,

    height: 58,

    borderRadius: 100,

    backgroundColor: "#ff3b30",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 8,

    elevation: 4,
  },

  deleteText: {
    fontSize: 15,

    fontWeight: "900",

    color: "#fff",
  },
});