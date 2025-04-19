import { Text, View, StyleSheet } from "react-native";
const AttendanceHistoryScreen = () => {
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
});

export default AttendanceHistoryScreen;
