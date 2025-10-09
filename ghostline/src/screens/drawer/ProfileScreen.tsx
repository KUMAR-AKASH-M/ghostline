import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen: React.FC = () => {
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
          <Text className="text-white text-2xl font-bold">Profile</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center py-8">
          <View className="w-32 h-32 rounded-full bg-military-green items-center justify-center mb-4">
            <Text className="text-white text-5xl font-bold">O</Text>
          </View>
          <Text className="text-white text-2xl font-bold">Officer 001</Text>
          <Text className="text-military-lightGrey text-lg mt-2">
            Active Defense Personnel
          </Text>
          <View className="flex-row mt-4">
            <View className="bg-military-green/20 px-4 py-2 rounded-full">
              <Text className="text-military-green text-sm font-semibold">
                🟢 Online
              </Text>
            </View>
          </View>
        </View>

        {/* Profile Info */}
        <View className="px-6 pb-6">
          <View className="bg-military-blue rounded-lg p-4 mb-4">
            <Text className="text-military-grey text-sm mb-1">Email</Text>
            <Text className="text-white text-base">officer001@defense.mil</Text>
          </View>

          <View className="bg-military-blue rounded-lg p-4 mb-4">
            <Text className="text-military-grey text-sm mb-1">Rank</Text>
            <Text className="text-white text-base">Captain</Text>
          </View>

          <View className="bg-military-blue rounded-lg p-4 mb-4">
            <Text className="text-military-grey text-sm mb-1">Unit</Text>
            <Text className="text-white text-base">5th Infantry Division</Text>
          </View>

          <View className="bg-military-blue rounded-lg p-4 mb-4">
            <Text className="text-military-grey text-sm mb-1">Service Number</Text>
            <Text className="text-white text-base">DEF-2025-1234</Text>
          </View>

          <TouchableOpacity className="bg-military-green py-4 rounded-lg mt-4">
            <Text className="text-white text-center font-semibold text-lg">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
