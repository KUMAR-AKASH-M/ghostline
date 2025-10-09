import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

export const SettingsScreen: React.FC = () => {
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
            Settings
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Notifications */}
        <View className="mb-6">
          <Text className="text-sm font-semibold mb-3" style={{ color: theme.colors.textSecondary }}>
            NOTIFICATIONS
          </Text>
          <TouchableOpacity
            className="rounded-lg p-4 mb-2"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              Push Notifications
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
              Message Sounds
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-lg p-4"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              Vibration
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chat */}
        <View className="mb-6">
          <Text className="text-sm font-semibold mb-3" style={{ color: theme.colors.textSecondary }}>
            CHAT
          </Text>
          <TouchableOpacity
            className="rounded-lg p-4 mb-2"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              Font Size
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
              Media Auto-Download
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-lg p-4"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              Message Backup
            </Text>
          </TouchableOpacity>
        </View>

        {/* Privacy */}
        <View className="mb-6">
          <Text className="text-sm font-semibold mb-3" style={{ color: theme.colors.textSecondary }}>
            PRIVACY
          </Text>
          <TouchableOpacity
            className="rounded-lg p-4 mb-2"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              Last Seen
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
              Profile Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-lg p-4"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              Blocked Contacts
            </Text>
          </TouchableOpacity>
        </View>

        {/* Data Usage */}
        <View className="mb-6">
          <Text className="text-sm font-semibold mb-3" style={{ color: theme.colors.textSecondary }}>
            DATA
          </Text>
          <TouchableOpacity
            className="rounded-lg p-4 mb-2"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              Network Usage
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-lg p-4"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              Storage Usage
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
