import React from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from "react-native";

import Modal from "react-native-modal";

type Props = {
  visible: boolean;

  children: React.ReactNode;

  onClose: () => void;
};

export default function AppModal({
  visible,
  children,
  onClose,
}: Props) {
  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      propagateSwipe
      useNativeDriver={false}

      /* ================= KEYBOARD AUTO MOVE ================= */
      // keyboard open hone pe modal auto adjust karega
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}

        /* ================= KEYBOARD PUSH TYPE ================= */
        // ios = smooth padding push
        // android = height shrink
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "position"
        }

        /* ================= KEYBOARD OFFSET CONTROL ================= */
        // keyboard kitna upar push karega
        // increase = more upward move
        // decrease = less upward move
        keyboardVerticalOffset={
          Platform.OS === "ios"
            ? 40
            : 0
        }
      >
        <View style={styles.container}>
          <View style={styles.dragBar} />

          <TouchableOpacity
            activeOpacity={1}
            onPress={Keyboard.dismiss}
          >
            <ScrollView
              /* ================= TAP CONTROL ================= */
              // input touch issue fix
              keyboardShouldPersistTaps="handled"

              showsVerticalScrollIndicator={
                false
              }

              /* ================= SCROLL EXPAND ================= */
              // keyboard open pe scroll allow
              contentContainerStyle={
                styles.scrollContent
              }

              /* ================= BOUNCE CONTROL ================= */
              // ios bounce effect off
              bounces={false}
            >
              {/* ================= CHILD CENTER WRAPPER ================= */}
              <View style={styles.content}>
                {children}
              </View>
            </ScrollView>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,

    justifyContent: "center",

    alignItems: "center",
  },

  /* ================= KEYBOARD ROOT AREA ================= */
  keyboardContainer: {
    width: "100%",
    
    justifyContent: "center",

    alignItems: "center",
  },

  container: {
    width: 370,

    /* ================= MODAL MAX HEIGHT ================= */
    // modal maximum height
    // keyboard open hone pe isi ke andar shrink hoga
    maxHeight: "99%",

    backgroundColor: "#fff",

    borderRadius: 36,

    paddingHorizontal: 18,

    paddingTop: 10,

    paddingBottom: 18,
  },

  dragBar: {
    width: 70,

    height: 7,

    borderRadius: 100,

    backgroundColor: "#ddd",

    alignSelf: "center",

    marginBottom: 18,
  },

  /* ================= SCROLL AREA ================= */
  scrollContent: {
    flexGrow: 1,
  },

  /* ================= CHILD CENTER CONTROL ================= */
  content: {
    width: "100%",

    alignItems: "center",

    justifyContent: "center",
  },
});