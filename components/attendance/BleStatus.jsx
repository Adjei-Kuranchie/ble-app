// components/attendance/BleStatus.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function BleStatus({ isEnabled }) {
  return (
    <View
      style={[
        styles.container,
        isEnabled ? styles.enabledContainer : styles.disabledContainer,
      ]}
    >
      <Text style={styles.text}>
        Bluetooth: {isEnabled ? "Enabled" : "Disabled"}
      </Text>
      {!isEnabled && (
        <Text style={styles.helpText}>
          Please enable Bluetooth in your device settings to use attendance
          features.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  enabledContainer: {
    backgroundColor: "#e8f5e9",
  },
  disabledContainer: {
    backgroundColor: "#ffebee",
  },
  text: {
    fontWeight: "bold",
  },
  helpText: {
    marginTop: 4,
    fontSize: 12,
  },
});
