import { Stack } from "expo-router";

const AuthLayOut = () => {
  return (
    <Stack>
      <Stack.Screen
        name="ForgotPasswordScreen"
        options={{ title: "ForgotPasswordScreen" }}
      />
      <Stack.Screen name="LoginScreen" options={{ title: "LoginScreen" }} />
      <Stack.Screen
        name="RegisterScreen"
        options={{ title: "RegisterScreen" }}
      />
    </Stack>
  );
};

export default AuthLayOut;
