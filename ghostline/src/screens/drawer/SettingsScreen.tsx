import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-military-dark">
      {/* Header */}
      <View className="bg-military-navy px-6 pt-12 pb-6">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <Text className="text-white text-2xl">‹</Text>
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold">Settings</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Notifications */}
        <View className="mb-6">
          <Text className="text-military-lightGrey text-sm font-semibold mb-3">
            NOTIFICATIONS
          </Text>
          <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-2">
            <Text className="text-white text-base">Push Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-2">
            <Text className="text-white text-base">Message Sounds</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-military-blue rounded-lg p-4">
            <Text className="text-white text-base">Vibration</Text>
          </TouchableOpacity>
        </View>

        {/* Chat */}
        <View className="mb-6">
          <Text className="text-military-lightGrey text-sm font-semibold mb-3">
            CHAT
          </Text>
          <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-2">
            <Text className="text-white text-base">Font Size</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-2">
            <Text className="text-white text-base">Media Auto-Download</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-military-blue rounded-lg p-4">
            <Text className="text-white text-base">Message Backup</Text>
          </TouchableOpacity>
        </View>

        {/* Privacy */}
        <View className="mb-6">
          <Text className="text-military-lightGrey text-sm font-semibold mb-3">
            PRIVACY
          </Text>
          <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-2">
            <Text className="text-white text-base">Last Seen</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-2">
            <Text className="text-white text-base">Profile Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-military-blue rounded-lg p-4">
            <Text className="text-white text-base">Blocked Contacts</Text>
          </TouchableOpacity>
        </View>

        {/* Data Usage */}
        <View className="mb-6">
          <Text className="text-military-lightGrey text-sm font-semibold mb-3">
            DATA
          </Text>
          <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-2">
            <Text className="text-white text-base">Network Usage</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-military-blue rounded-lg p-4">
            <Text className="text-white text-base">Storage Usage</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
