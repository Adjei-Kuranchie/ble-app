import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ScanScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AttendanceHistoryScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  scanControlsContainer: {
    marginVertical: 8,
  },
  deviceItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deviceInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  errorContainer: {
    padding: 8,
    backgroundColor: "#ffebee",
    borderRadius: 4,
    marginVertical: 8,
  },
  errorText: {
    color: "#c62828",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#9e9e9e",
    textAlign: "center",
  },
  submittingContainer: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 16,
  },
});

export default ScanScreen;
