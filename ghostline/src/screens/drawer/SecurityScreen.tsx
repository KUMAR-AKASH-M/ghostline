import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const SecurityScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [screenshotProtection, setScreenshotProtection] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [autoLock, setAutoLock] = useState(true);

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
          <Text className="text-white text-2xl font-bold">Security</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Screenshot Protection */}
        <View className="bg-military-blue rounded-lg p-4 mb-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-1 pr-4">
              <Text className="text-white text-base font-semibold">
                Screenshot Protection
              </Text>
              <Text className="text-military-grey text-sm mt-1">
                Prevent screenshots in sensitive screens
              </Text>
            </View>
            <Switch
              value={screenshotProtection}
              onValueChange={setScreenshotProtection}
              trackColor={{ false: '#95a5a6', true: '#556B2F' }}
              thumbColor={screenshotProtection ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Biometric Authentication */}
        <View className="bg-military-blue rounded-lg p-4 mb-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-1 pr-4">
              <Text className="text-white text-base font-semibold">
                Biometric Login
              </Text>
              <Text className="text-military-grey text-sm mt-1">
                Use fingerprint or face ID
              </Text>
            </View>
            <Switch
              value={biometricAuth}
              onValueChange={setBiometricAuth}
              trackColor={{ false: '#95a5a6', true: '#556B2F' }}
              thumbColor={biometricAuth ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Auto Lock */}
        <View className="bg-military-blue rounded-lg p-4 mb-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-1 pr-4">
              <Text className="text-white text-base font-semibold">
                Auto Lock
              </Text>
              <Text className="text-military-grey text-sm mt-1">
                Lock app after 5 minutes of inactivity
              </Text>
            </View>
            <Switch
              value={autoLock}
              onValueChange={setAutoLock}
              trackColor={{ false: '#95a5a6', true: '#556B2F' }}
              thumbColor={autoLock ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Change PIN */}
        <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-4">
          <Text className="text-white text-base font-semibold">
            Change PIN
          </Text>
          <Text className="text-military-grey text-sm mt-1">
            Update your security PIN
          </Text>
        </TouchableOpacity>

        {/* Two-Factor Authentication */}
        <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-4">
          <Text className="text-white text-base font-semibold">
            Two-Factor Authentication
          </Text>
          <Text className="text-military-green text-sm mt-1">
            ✓ Enabled
          </Text>
        </TouchableOpacity>

        {/* Session Management */}
        <TouchableOpacity className="bg-military-blue rounded-lg p-4 mb-4">
          <Text className="text-white text-base font-semibold">
            Active Sessions
          </Text>
          <Text className="text-military-grey text-sm mt-1">
            Manage logged in devices
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
