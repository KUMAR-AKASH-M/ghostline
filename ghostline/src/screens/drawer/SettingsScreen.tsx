import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
];

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { theme, isDark } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [messageSounds, setMessageSounds] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [showLanguages, setShowLanguages] = useState(false);

  const handleLanguageChange = async (languageCode: string) => {
    setSelectedLanguage(languageCode);
    await AsyncStorage.setItem('@app_language', languageCode);
    setShowLanguages(false);
    Alert.alert('Language Changed', 'App language will update on next restart');
  };

  const handleEmergencyWipe = () => {
    Alert.alert(
      'Emergency Data Wipe',
      'This will:\n• Delete all app data instantly\n• Trigger "data tamper" alert to HQ\n• Log you out permanently\n\nThis action cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Wipe Data',
          style: 'destructive',
          onPress: async () => {
            // In production, this would:
            // 1. Send alert to HQ
            // 2. Delete all local data
            // 3. Revoke all sessions
            // 4. Clear secure storage
            Alert.alert(
              'Data Wiped',
              'All data has been deleted and HQ has been notified.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    // Navigate to login
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

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
        {/* Notifications Section */}
        <Text className="text-sm font-bold mb-3" style={{ color: theme.colors.textSecondary }}>
          NOTIFICATIONS
        </Text>

        <View
          className="rounded-lg p-4 mb-3 border"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.border,
          }}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-1 pr-4">
              <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
                Push Notifications
              </Text>
              <Text className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
                Receive notifications for new messages
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
              thumbColor={notifications ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View
          className="rounded-lg p-4 mb-3 border"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.border,
          }}
        >
          <View className="flex-row justify-between items-center">
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              Message Sounds
            </Text>
            <Switch
              value={messageSounds}
              onValueChange={setMessageSounds}
              trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
              thumbColor={messageSounds ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View
          className="rounded-lg p-4 mb-4 border"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.border,
          }}
        >
          <View className="flex-row justify-between items-center">
            <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
              Vibration
            </Text>
            <Switch
              value={vibration}
              onValueChange={setVibration}
              trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
              thumbColor={vibration ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Language Section */}
        <Text className="text-sm font-bold mb-3 mt-4" style={{ color: theme.colors.textSecondary }}>
          LANGUAGE
        </Text>

        <TouchableOpacity
          className="rounded-lg p-4 mb-4 border"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.border,
          }}
          onPress={() => setShowLanguages(!showLanguages)}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
                App Language
              </Text>
              <Text className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
                {LANGUAGES.find(lang => lang.code === selectedLanguage)?.nativeName}
              </Text>
            </View>
            <Ionicons
              name={showLanguages ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={theme.colors.textSecondary}
            />
          </View>
        </TouchableOpacity>

        {showLanguages && (
          <View className="mb-4">
            {LANGUAGES.map((language) => (
              <TouchableOpacity
                key={language.code}
                className="p-4 rounded-lg mb-2 border"
                style={{
                  backgroundColor: selectedLanguage === language.code ? `${theme.colors.accent}20` : theme.colors.cardBg,
                  borderColor: selectedLanguage === language.code ? theme.colors.accent : theme.colors.border,
                }}
                onPress={() => handleLanguageChange(language.code)}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text
                      className="font-semibold"
                      style={{
                        color: selectedLanguage === language.code ? theme.colors.accent : theme.colors.textPrimary,
                      }}
                    >
                      {language.name}
                    </Text>
                    <Text className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
                      {language.nativeName}
                    </Text>
                  </View>
                  {selectedLanguage === language.code && (
                    <Ionicons name="checkmark-circle" size={24} color={theme.colors.accent} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Chat Section */}
        <Text className="text-sm font-bold mb-3 mt-4" style={{ color: theme.colors.textSecondary }}>
          CHAT
        </Text>

        <TouchableOpacity
          className="rounded-lg p-4 mb-3 border"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.border,
          }}
        >
          <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
            Font Size
          </Text>
          <Text className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
            Medium
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded-lg p-4 mb-4 border"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.border,
          }}
        >
          <Text className="text-base" style={{ color: theme.colors.textPrimary }}>
            Media Auto-Download
          </Text>
          <Text className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
            Disabled for security
          </Text>
        </TouchableOpacity>

        {/* Emergency Section */}
        <Text className="text-sm font-bold mb-3 mt-4" style={{ color: theme.colors.textSecondary }}>
          EMERGENCY
        </Text>

        <TouchableOpacity
          className="rounded-lg p-4 mb-6 border-2"
          style={{
            backgroundColor: isDark ? '#7F1D1D' : '#FEE2E2',
            borderColor: theme.colors.error,
          }}
          onPress={handleEmergencyWipe}
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="warning" size={24} color={theme.colors.error} />
            <Text className="text-base font-bold ml-2" style={{ color: theme.colors.error }}>
              Emergency Data Wipe
            </Text>
          </View>
          <Text className="text-sm" style={{ color: theme.colors.error }}>
            Instantly delete all app data and alert HQ of potential security breach
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
