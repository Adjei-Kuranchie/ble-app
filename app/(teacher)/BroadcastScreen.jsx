// app/teacher/broadcast.js
import React from "react";
import { StyleSheet, View } from "react-native";

const BroadcastScreen = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    marginVertical: 16,
  },
  broadcastingCard: {
    marginVertical: 16,
    backgroundColor: "#e8f5e9",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    width: "100%",
    marginTop: 8,
  },
  infoText: {
    color: "#666",
    fontSize: 14,
    marginTop: 8,
  },
  activeInfoText: {
    color: "#2e7d32",
    fontSize: 14,
    marginTop: 16,
    textAlign: "center",
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    width: 140,
  },
  codeValue: {
    fontSize: 18,
    fontWeight: "bold",
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
});

export default BroadcastScreen;
