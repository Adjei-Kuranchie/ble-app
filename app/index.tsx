import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance App</Text>
      <Text style={styles.subtitle}>
        Bluetooth Low Energy Attendance System
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => router.replace("/(teacher)/TeacherIndex")}
          style={[styles.button, styles.teacherButton]}
        >
          I am a Teacher
        </Button>

        <Button
          mode="contained"
          onPress={() => router.replace("/(student)/StudentIndex")}
          style={[styles.button, styles.studentButton]}
        >
          I am a Student
        </Button>
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Button mode="text" onPress={() => router.push("/(auth)/LoginScreen")}>
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
  },
  button: {
    marginVertical: 8,
    paddingVertical: 8,
  },
  teacherButton: {
    backgroundColor: "#1565c0",
  },
  studentButton: {
    backgroundColor: "#2e7d32",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
  },
  loginText: {
    color: "#666",
  },
});
