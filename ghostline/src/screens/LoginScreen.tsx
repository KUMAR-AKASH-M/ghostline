import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthService } from '../services/auth/AuthService';
import { TEST_USERS } from '../services/mock/MockData';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [armyId, setArmyId] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!armyId || !phone) {
      Alert.alert('Error', 'Please enter Army ID and Phone Number');
      return;
    }

    setIsLoading(true);
    try {
      const result = await AuthService.login({ armyId, phone });
      
      // Navigate to OTP verification
      navigation.navigate('OTPVerification', {
        armyId,
        phone,
        otp: result.otp,
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fillTestUser = () => {
    setArmyId(TEST_USERS.personnel.armyId);
    setPhone(TEST_USERS.personnel.phone);
  };

  return (
    <View className="flex-1 bg-military-dark justify-center px-6">
      <View className="mb-12">
        <Text className="text-white text-4xl font-bold mb-2">
          Defense Secure
        </Text>
        <Text className="text-military-lightGrey text-lg">
          Encrypted Communication Platform
        </Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-military-lightGrey mb-2 font-medium">
            Army ID
          </Text>
          <TextInput
            className="bg-military-blue text-white px-4 py-3 rounded-lg border border-military-grey"
            placeholder="Enter Army ID"
            placeholderTextColor="#95a5a6"
            value={armyId}
            onChangeText={setArmyId}
            autoCapitalize="characters"
          />
        </View>

        <View>
          <Text className="text-military-lightGrey mb-2 font-medium">
            Phone Number
          </Text>
          <TextInput
            className="bg-military-blue text-white px-4 py-3 rounded-lg border border-military-grey"
            placeholder="+91 XXXXXXXXXX"
            placeholderTextColor="#95a5a6"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          className={`py-4 rounded-lg mt-6 ${
            isLoading ? 'bg-military-grey' : 'bg-military-green'
          }`}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {isLoading ? 'Checking...' : 'Send OTP'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-4"
          onPress={() => navigation.navigate('Register')}
        >
          <Text className="text-military-green text-center font-medium">
            New User? Register Here
          </Text>
        </TouchableOpacity>

        <Text className="text-military-grey text-sm text-center mt-4">
          🔒 End-to-end encrypted with seed phrase security
        </Text>
      </View>

      {/* Test Credentials Helper */}
      <View className="mt-8 p-4 bg-military-blue rounded-lg">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-military-lightGrey text-xs">Test Credentials:</Text>
          <TouchableOpacity onPress={fillTestUser}>
            <Text className="text-military-green text-xs font-semibold">
              Auto Fill →
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-white text-xs">
          Army ID: {TEST_USERS.personnel.armyId}
        </Text>
        <Text className="text-white text-xs">
          Phone: {TEST_USERS.personnel.phone}
        </Text>
      </View>
    </View>
  );
};
