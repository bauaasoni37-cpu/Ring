import React, { forwardRef } from "react";

import {
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

const AppInput = forwardRef<
  TextInput,
  TextInputProps
>(({ style, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      placeholderTextColor="#8a8a8a"
      style={[styles.input, style]}
      {...props}
    />
  );
});

export default AppInput;

const styles = StyleSheet.create({
  input: {
    /* ================= WIDTH CONTROL ================= */
    // input kitna choda hoga
    width: 280,

    /* ================= HEIGHT CONTROL ================= */
    // input kitna lamba hoga
    height: 50,

    backgroundColor: "#f3f3f3",

    /* ================= ROUNDNESS CONTROL ================= */
    // corners kitne gol honge
    borderRadius: 22,

    /* ================= LEFT RIGHT INNER SPACE ================= */
    // andar left-right se gap
    paddingHorizontal: 35,

    /* ================= TEXT SIZE CONTROL ================= */
    // typing text size
    fontSize: 16,

    fontWeight: "600",

    color: "#000",

    /* ================= BOTTOM GAP CONTROL ================= */
    // niche next component se distance
    marginBottom: 8,
  },
});