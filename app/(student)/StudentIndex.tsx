import { Text, View, StyleSheet } from "react-native";
function StudentIndex() {
  return (
    <View style={styles.container}>
      <Text>Student index</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StudentIndex;
