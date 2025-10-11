// Import polyfills at the very top
import 'react-native-get-random-values';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

import React, { useEffect, useState } from 'react';
import './global.css';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreenshotProtection, useAppBackgroundBlur } from './src/services/security/ScreenshotProtection';
import { BiometricAuthService } from './src/services/security/BiometricAuth';
import { AutoLockService } from './src/services/security/AutoLockService';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function AppContent() {
  const [isLocked, setIsLocked] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    // Enable global screenshot protection
    enableScreenshotProtection();

    // Set up auto-lock callback
    AutoLockService.setLockCallback(() => {
      setIsLocked(true);
    });

    // Start monitoring app state
    AutoLockService.startMonitoring();

    return () => {
      AutoLockService.stopMonitoring();
    };
  }, []);

  // Use background blur hook
  useAppBackgroundBlur();

  const handleUnlock = async () => {
    setIsAuthenticating(true);
    
    const biometricEnabled = await BiometricAuthService.isEnabled();
    
    if (biometricEnabled) {
      const success = await BiometricAuthService.authenticate('Unlock Defense Secure');
      if (success) {
        setIsLocked(false);
        await AutoLockService.updateLastActiveTime();
      }
    } else {
      // Fallback to seed phrase or other authentication
      setIsLocked(false);
      await AutoLockService.updateLastActiveTime();
    }
    
    setIsAuthenticating(false);
  };

  if (isLocked) {
    return (
      <View className="flex-1 bg-dark-primary items-center justify-center px-6">
        <View className="w-24 h-24 rounded-full bg-dark-accent items-center justify-center mb-8">
          <Ionicons name="lock-closed" size={48} color="#FFFFFF" />
        </View>
        <Text className="text-white text-2xl font-bold mb-2">
          App Locked
        </Text>
        <Text className="text-dark-text-secondary text-center mb-8">
          Authenticate to continue using Defense Secure
        </Text>
        <TouchableOpacity
          className="bg-dark-accent py-4 px-8 rounded-lg"
          onPress={handleUnlock}
          disabled={isAuthenticating}
        >
          {isAuthenticating ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white font-bold text-lg">
              Unlock
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return <AppNavigator />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
