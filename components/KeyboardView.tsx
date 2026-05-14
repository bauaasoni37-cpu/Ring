import React from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";

type Props = {
  children: React.ReactNode;
};

export default function KeyboardView({
  children,
}: Props) {
  return (
    <KeyboardAvoidingView
      style={styles.flex}

      /* ================= KEYBOARD PUSH CONTROL ================= */
      // ios me keyboard open hone pe content push hoga
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }

      /* ================= KEYBOARD OFFSET CONTROL ================= */
      // keyboard kitna upar push karega
      keyboardVerticalOffset={
        Platform.OS === "ios"
          ? 40
          : 0
      }
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <ScrollView
          style={styles.flex}

          /* ================= SCROLL EXPAND CONTROL ================= */
          contentContainerStyle={
            styles.scroll
          }

          /* ================= TAP CONTROL ================= */
          // input touch properly work karega
          keyboardShouldPersistTaps="handled"

          /* ================= SCROLL BOUNCE CONTROL ================= */
          bounces={false}

          showsVerticalScrollIndicator={
            false
          }
        >
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
  },
});