import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const AboutScreen: React.FC = () => {
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
          <Text className="text-white text-2xl font-bold">About</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-8">
        {/* App Logo */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-military-green items-center justify-center mb-4">
            <Text className="text-white text-4xl">🛡️</Text>
          </View>
          <Text className="text-white text-2xl font-bold">Ghost Line</Text>
          <Text className="text-military-lightGrey mt-2">Version 1.0.0</Text>
        </View>

        {/* Info */}
        <View className="bg-military-blue rounded-lg p-6 mb-4">
          <Text className="text-military-lightGrey text-center leading-6">
            A secure communication platform designed for defense personnel,
            veterans, and their families. Built with military-grade encryption
            and advanced security features.
          </Text>
        </View>

        {/* Features */}
        <View className="bg-military-blue rounded-lg p-6 mb-4">
          <Text className="text-white font-semibold mb-3">Key Features:</Text>
          <Text className="text-military-lightGrey mb-2">
            • End-to-end encryption
          </Text>
          <Text className="text-military-lightGrey mb-2">
            • Screenshot protection
          </Text>
          <Text className="text-military-lightGrey mb-2">
            • Multi-factor authentication
          </Text>
          <Text className="text-military-lightGrey mb-2">
            • Secure file sharing
          </Text>
          <Text className="text-military-lightGrey">
            • Voice & video calls
          </Text>
        </View>

        {/* Legal */}
        <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-2">
          <Text className="text-white text-base">Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-2">
          <Text className="text-white text-base">Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-2">
          <Text className="text-white text-base">Licenses</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text className="text-military-grey text-center text-xs mt-8">
          © 2025 Defense Secure. All rights reserved.
        </Text>
      </ScrollView>
    </View>
  );
};
