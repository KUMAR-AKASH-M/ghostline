import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthService } from '../services/auth/AuthService';

export const OTPVerificationScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { armyId, phone, otp: generatedOtp } = route.params;
  
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const result = await AuthService.verifyLoginOTP(armyId, phone, otp);
      
      // Navigate to seed phrase screen
      navigation.navigate('SeedPhrase', {
        armyId,
        phone,
        publicKey: result.publicKey,
        encryptedPrivateKey: result.encryptedPrivateKey,
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-military-dark justify-center px-6">
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        className="mb-6"
      >
        <Text className="text-military-green text-lg">← Back</Text>
      </TouchableOpacity>

      <Text className="text-white text-3xl font-bold mb-2">
        Verify OTP
      </Text>
      <Text className="text-military-lightGrey text-lg mb-8">
        Enter the 6-digit code sent to {phone}
      </Text>

      <TextInput
        className="bg-military-blue text-white px-4 py-4 rounded-lg border border-military-grey text-center text-2xl tracking-widest mb-4"
        placeholder="000000"
        placeholderTextColor="#95a5a6"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        autoFocus
      />

      <View className="bg-military-blue rounded-lg p-4 mb-6">
        <Text className="text-military-grey text-sm">
          📱 Mock OTP: {generatedOtp}
        </Text>
      </View>

      <TouchableOpacity
        className={`py-4 rounded-lg ${
          otp.length === 6 && !isLoading
            ? 'bg-military-green'
            : 'bg-military-grey opacity-50'
        }`}
        onPress={handleVerify}
        disabled={otp.length !== 6 || isLoading}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </Text>
      </TouchableOpacity>

      <Text className="text-military-grey text-sm text-center mt-6">
        🔒 Secure OTP verification
      </Text>
    </View>
  );
};
