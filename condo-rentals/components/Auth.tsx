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
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { supabase } from '../backend/supabase';
import { Button, Input } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ paddingVertical: 60, flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.innerContent}>
              <Text style={styles.welcome}>Welcome to</Text>
              <Text style={styles.title}>🏢 Condo Rentals 🏢 </Text>

              <Input
                containerStyle={{
                  paddingHorizontal: 0,
                  marginHorizontal: 0,
                  width: '100%',
                }}
                label="Email"
                placeholder="you@futuremail.com"
                leftIcon={{ type: 'feather', name: 'mail', color: '#94a3b8' }}
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
                inputContainerStyle={styles.inputBox}
                inputStyle={styles.inputText}
                labelStyle={styles.inputLabel}
                placeholderTextColor="#64748b"
              />

              <Input
                containerStyle={{
                  paddingHorizontal: 0,
                  marginHorizontal: 0,
                  width: '100%',
                }}
                label="Password"
                placeholder="••••••••"
                secureTextEntry={secure}
                autoCapitalize="none"
                leftIcon={{ type: 'feather', name: 'lock', color: '#94a3b8' }}
                rightIcon={
                  <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <Feather name={secure ? 'eye-off' : 'eye'} size={20} color="#94a3b8" />
                  </TouchableOpacity>
                }
                onChangeText={setPassword}
                value={password}
                inputContainerStyle={styles.inputBox}
                inputStyle={styles.inputText}
                labelStyle={styles.inputLabel}
                placeholderTextColor="#64748b"
              />

              <TouchableOpacity onPress={() => router.push('/auth/reset')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              <View style={styles.buttonGroup}>
                <Button
                  title="Log In"
                  buttonStyle={styles.primaryButton}
                  titleStyle={styles.primaryText}
                  containerStyle={styles.buttonContainer}
                  loading={loading}
                  disabled={loading}
                  onPress={signInWithEmail}
                />
                <Button
                  title="Create Account"
                  type="outline"
                  buttonStyle={styles.outlineButton}
                  titleStyle={styles.outlineText}
                  containerStyle={styles.buttonContainer}
                  loading={loading}
                  disabled={loading}
                  onPress={signUpWithEmail}
                />
                <Button
                  title="Continue as Guest"
                  type="clear"
                  onPress={signInAsGuest}
                  titleStyle={styles.guestText}
                  disabled={loading}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    backgroundColor: '#0f172a',
  },
  innerContent: {
    width: '100%',
    paddingHorizontal: 16,
    alignSelf: 'stretch',
  },
  welcome: {
    fontSize: 20,
    fontWeight: '500',
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#e0f2fe',
    textAlign: 'center',
    marginBottom: 16,
  },
  subheader: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 28,
  },
  inputBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 0,
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 4,
  },
  inputText: {
    fontSize: 16,
    color: '#f8fafc',
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#38bdf8',
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
    alignSelf: 'center',
  },
  primaryButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 14,
    borderRadius: 12,
  },
  primaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f0f9ff',
  },
  outlineButton: {
    borderColor: '#38bdf8',
    paddingVertical: 14,
    borderRadius: 12,
  },
  outlineText: {
    fontSize: 16,
    color: '#38bdf8',
    fontWeight: '600',
  },
  guestText: {
    fontSize: 15,
    color: '#94a3b8',
    textDecorationLine: 'underline',
    marginTop: 12,
  },
});
