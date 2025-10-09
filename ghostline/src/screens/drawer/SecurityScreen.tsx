import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

export const SecurityScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { theme, isDark } = useTheme();
  const [screenshotProtection, setScreenshotProtection] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [autoLock, setAutoLock] = useState(true);

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.primaryBg }}>
      {/* Header */}
      <View
        className="px-6 pt-12 pb-6"
        style={{ backgroundColor: theme.colors.secondaryBg }}
      >
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold" style={{ color: theme.colors.textPrimary }}>
            Security
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Screenshot Protection */}
        <View
          className="rounded-lg p-4 mb-4"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-1 pr-4">
              <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
                Screenshot Protection
              </Text>
              <Text className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
                Prevent screenshots in sensitive screens
              </Text>
            </View>
            <Switch
              value={screenshotProtection}
              onValueChange={setScreenshotProtection}
              trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
              thumbColor={screenshotProtection ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Biometric Authentication */}
        <View
          className="rounded-lg p-4 mb-4"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-1 pr-4">
              <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
                Biometric Login
              </Text>
              <Text className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
                Use fingerprint or face ID
              </Text>
            </View>
            <Switch
              value={biometricAuth}
              onValueChange={setBiometricAuth}
              trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
              thumbColor={biometricAuth ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Auto Lock */}
        <View
          className="rounded-lg p-4 mb-4"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-1 pr-4">
              <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
                Auto Lock
              </Text>
              <Text className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
                Lock app after 5 minutes of inactivity
              </Text>
            </View>
            <Switch
              value={autoLock}
              onValueChange={setAutoLock}
              trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
              thumbColor={autoLock ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Change PIN */}
        <TouchableOpacity
          className="rounded-lg p-4 mb-4"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
            Change PIN
          </Text>
          <Text className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
            Update your security PIN
          </Text>
        </TouchableOpacity>

        {/* Two-Factor Authentication */}
        <TouchableOpacity
          className="rounded-lg p-4 mb-4"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
            Two-Factor Authentication
          </Text>
          <Text className="text-sm mt-1" style={{ color: theme.colors.success }}>
            ✓ Enabled
          </Text>
        </TouchableOpacity>

        {/* Session Management */}
        <TouchableOpacity
          className="rounded-lg p-4 mb-4"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
            Active Sessions
          </Text>
          <Text className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
            Manage logged in devices
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
