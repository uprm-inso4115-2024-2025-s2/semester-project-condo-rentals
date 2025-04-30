import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../backend/supabase";
import { useRouter } from "expo-router";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleResetPassword() {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Password reset link sent! Check your email.");
      router.replace("/auth");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot your password?</Text>
      <Text style={styles.subtitle}>We'll send you a link to reset it.</Text>

      <TextInput
        placeholder="Email address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleResetPassword}
        disabled={loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send Reset Link</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e1a2b", // Dark blue condo background
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#cde5ff",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#87a8c0",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1c2a3e",
    color: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#2e4a6f",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0d6efd", // Modern blue
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#3399ff", // Glow color
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});