// app/(common)/_layout.tsx
import { Stack } from "expo-router";

const CommonLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="NotificationScreen"
        options={{ title: "Notifications" }}
      />
      <Stack.Screen name="ProfileScreen" options={{ title: "Profile" }} />
      <Stack.Screen name="SettingsScreen" options={{ title: "Settings" }} />
      <Stack.Screen name="CommonIndex" options={{ title: "CommonIndex" }} />
    </Stack>
  );
};

export default CommonLayout;
