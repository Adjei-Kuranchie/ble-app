import { Text, View, StyleSheet } from "react-native";
function AvailableSessionsScreen() {
  return (
    <View style={styles.container}>
      <Text>AvailableSessionsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AvailableSessionsScreen;
