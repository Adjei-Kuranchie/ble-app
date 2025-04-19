import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    // <BleProvider>
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false, // Hide header for auth group
        }}
      />
      <Stack.Screen
        name="(common)"
        options={{
          headerShown: false, // Hide header for common group
        }}
      />
      <Stack.Screen
        name="(student)"
        options={{
          headerShown: false, // Hide header for student group
        }}
      />
      <Stack.Screen
        name="(teacher)"
        options={{
          headerShown: false, // Hide header for teacher group
        }}
      />
    </Stack>
    // </BleProvider>
  );
};
export default RootLayout;
