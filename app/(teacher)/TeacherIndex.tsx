import { Text, View, StyleSheet } from "react-native";

const TeacherIndex = () => {
  return (
    <View style={styles.container}>
      <Text>Teacher index</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TeacherIndex;
