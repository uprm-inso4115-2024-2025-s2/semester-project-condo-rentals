import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { supabase } from '../backend/supabase';
import { Button, Input } from '@rneui/themed';
import { useRouter } from 'expo-router';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signInWithEmail() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Hold up!", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert("Login Failed", error.message);
    else router.replace('/(tabs)/Listings');
    setLoading(false);
  }

  async function signUpWithEmail() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Heads up!", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    const { data: { session }, error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert("Sign-Up Failed", error.message);
    if (!session) Alert.alert('Success!', 'Please check your inbox for verification.');
    setLoading(false);
  }

  async function signInAsGuest() {
    setLoading(true);
    const { error } = await supabase.auth.signInAnonymously();
    if (error) Alert.alert("Guest Sign-In Failed", error.message);
    else {
      Alert.alert("Welcome!", "You're in as a guest.");
      router.replace('/(tabs)/Listings');
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f4f7fb' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Welcome 👋</Text>
          <Text style={styles.subheader}>Log in to your account</Text>

          <Input
            label="Email"
            placeholder="you@example.com"
            leftIcon={{ type: 'feather', name: 'mail' }}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
            inputContainerStyle={styles.inputBox}
            inputStyle={styles.inputText}
            labelStyle={styles.inputLabel}
          />

          <Input
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            autoCapitalize="none"
            leftIcon={{ type: 'feather', name: 'lock' }}
            onChangeText={setPassword}
            value={password}
            inputContainerStyle={styles.inputBox}
            inputStyle={styles.inputText}
            labelStyle={styles.inputLabel}
          />

          <TouchableOpacity onPress={() => router.push('/auth/reset')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.buttonGroup}>
            <Button
              title="Sign In"
              buttonStyle={styles.primaryButton}
              titleStyle={styles.primaryText}
              containerStyle={styles.buttonContainer}
              disabled={loading}
              onPress={signInWithEmail}
            />
            <Button
              title="Create Account"
              type="outline"
              buttonStyle={styles.outlineButton}
              titleStyle={styles.outlineText}
              containerStyle={styles.buttonContainer}
              disabled={loading}
              onPress={signUpWithEmail}
            />
            <TouchableOpacity onPress={signInAsGuest} disabled={loading}>
              <Text style={styles.guestText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 28,
    backgroundColor: '#f4f7fb',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  subheader: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 28,
  },
  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  inputLabel: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  inputText: {
    fontSize: 16,
    color: '#222',
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#5b8df6',
    textDecorationLine: 'underline',
    marginTop: -8,
    marginBottom: 20,
  },
  buttonGroup: {
    marginTop: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#5b8df6',
    paddingVertical: 14,
    borderRadius: 12,
  },
  primaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  outlineButton: {
    borderColor: '#5b8df6',
    paddingVertical: 14,
    borderRadius: 12,
  },
  outlineText: {
    fontSize: 16,
    color: '#5b8df6',
    fontWeight: '600',
  },
  guestText: {
    color: '#999',
    marginTop: 14,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
