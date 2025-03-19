import React from 'react';
import { View } from 'react-native';
import Auth from '../../components/Auth';

export default function AuthScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Auth />
    </View>
  );
}

