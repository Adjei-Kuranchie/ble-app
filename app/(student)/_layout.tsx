import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const StudentLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="StudentIndex"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ScanScreen"
        options={{
          headerShown: false,
          title: "Scan",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AttendanceHistoryScreen"
        options={{
          headerShown: false,
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AvailableSessionsScreen"
        options={{
          headerShown: false,
          title: "Sessions",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default StudentLayout;
