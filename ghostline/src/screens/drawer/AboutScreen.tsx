import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

export const AboutScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { theme, isDark } = useTheme();

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
            About
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-8">
        {/* App Logo */}
        <View className="items-center mb-8">
          <View
            className="w-24 h-24 rounded-full items-center justify-center mb-4"
            style={{
              backgroundColor: theme.colors.accent,
              shadowColor: theme.colors.accent,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 10,
            }}
          >
            <Ionicons name="shield-checkmark" size={48} color="#FFFFFF" />
          </View>
          <Text className="text-2xl font-bold" style={{ color: theme.colors.textPrimary }}>
            Defense Secure
          </Text>
          <Text className="mt-2" style={{ color: theme.colors.textSecondary }}>
            Version 1.0.0
          </Text>
        </View>

        {/* Info */}
        <View
          className="rounded-lg p-6 mb-4"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text className="text-center leading-6" style={{ color: theme.colors.textSecondary }}>
            A secure communication platform designed for defense personnel,
            veterans, and their families. Built with military-grade encryption
            and advanced security features.
          </Text>
        </View>

        {/* Features */}
        <View
          className="rounded-lg p-6 mb-4"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text className="font-semibold mb-3" style={{ color: theme.colors.textPrimary }}>
            Key Features:
          </Text>
          <Text className="mb-2" style={{ color: theme.colors.textSecondary }}>
            • End-to-end encryption
          </Text>
          <Text className="mb-2" style={{ color: theme.colors.textSecondary }}>
            • Screenshot protection
          </Text>
          <Text className="mb-2" style={{ color: theme.colors.textSecondary }}>
            • Multi-factor authentication
          </Text>
          <Text className="mb-2" style={{ color: theme.colors.textSecondary }}>
            • Secure file sharing
          </Text>
          <Text style={{ color: theme.colors.textSecondary }}>
            • Voice & video calls
          </Text>
        </View>

        {/* Legal */}
        <TouchableOpacity
          className="rounded-lg p-4 mb-2"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
            Terms of Service
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-lg p-4 mb-2"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-lg p-4 mb-2"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
            Licenses
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text className="text-center text-xs mt-8" style={{ color: theme.colors.textSecondary }}>
          © 2025 Defense Secure. All rights reserved.
        </Text>
      </ScrollView>
    </View>
  );
};
