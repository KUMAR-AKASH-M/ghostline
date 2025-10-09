import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

export const ProfileScreen: React.FC = () => {
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
            Profile
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center py-8">
          <View
            className="w-32 h-32 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: theme.colors.accent }}
          >
            <Text className="text-white text-5xl font-bold">O</Text>
          </View>
          <Text className="text-2xl font-bold" style={{ color: theme.colors.textPrimary }}>
            Officer 001
          </Text>
          <Text className="text-lg mt-2" style={{ color: theme.colors.textSecondary }}>
            Active Defense Personnel
          </Text>
          <View className="flex-row mt-4">
            <View
              className="px-4 py-2 rounded-full"
              style={{ backgroundColor: isDark ? theme.colors.cardBg : theme.colors.secondaryBg }}
            >
              <Text className="text-sm font-semibold" style={{ color: theme.colors.accent }}>
                🟢 Online
              </Text>
            </View>
          </View>
        </View>

        {/* Profile Info */}
        <View className="px-6 pb-6">
          <View
            className="rounded-lg p-4 mb-4"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-sm mb-1" style={{ color: theme.colors.textSecondary }}>
              Email
            </Text>
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              officer001@defense.mil
            </Text>
          </View>

          <View
            className="rounded-lg p-4 mb-4"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-sm mb-1" style={{ color: theme.colors.textSecondary }}>
              Rank
            </Text>
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              Captain
            </Text>
          </View>

          <View
            className="rounded-lg p-4 mb-4"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-sm mb-1" style={{ color: theme.colors.textSecondary }}>
              Unit
            </Text>
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              5th Infantry Division
            </Text>
          </View>

          <View
            className="rounded-lg p-4 mb-4"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-sm mb-1" style={{ color: theme.colors.textSecondary }}>
              Service Number
            </Text>
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              DEF-2025-1234
            </Text>
          </View>

          <TouchableOpacity
            className="py-4 rounded-lg mt-4"
            style={{ backgroundColor: theme.colors.accent }}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
