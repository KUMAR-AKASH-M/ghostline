import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthService, RegistrationData } from '../services/auth/AuthService';
import { CryptoService } from '../services/auth/CryptoService';

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState(1);
  const [armyId, setArmyId] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [rank, setRank] = useState('');
  const [unit, setUnit] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!armyId || !phone || !name || !rank || !unit) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setIsLoading(true);
    try {
      const registrationData: RegistrationData = {
        armyId,
        phone,
        name,
        rank,
        unit,
      };

      const result = await AuthService.register(registrationData);
      setGeneratedOtp(result.otp);
      setStep(2);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateSeedPhrase = async () => {
    setIsLoading(true);
    try {
      const phrase = await CryptoService.generateSeedPhrase();
      setSeedPhrase(phrase);
      setStep(3);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to generate seed phrase');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndComplete = async () => {
    if (otp !== generatedOtp) {
      Alert.alert('Error', 'Invalid OTP');
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.verifyRegistrationOTP(armyId, phone, otp, seedPhrase);
      Alert.alert(
        'Success',
        'Registration complete! Please save your seed phrase securely.',
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('Login'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-military-dark">
      <ScrollView className="flex-1 px-6 pt-12">
        {/* Step 1: User Details */}
        {step === 1 && (
          <>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              className="mb-6"
            >
              <Text className="text-military-green text-lg">← Back to Login</Text>
            </TouchableOpacity>

            <Text className="text-white text-3xl font-bold mb-2">Register</Text>
            <Text className="text-military-lightGrey text-lg mb-8">
              Create your secure account
            </Text>

            <View className="space-y-4">
              <View>
                <Text className="text-military-lightGrey mb-2 font-medium">
                  Army ID *
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
                  Phone Number *
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

              <View>
                <Text className="text-military-lightGrey mb-2 font-medium">
                  Full Name *
                </Text>
                <TextInput
                  className="bg-military-blue text-white px-4 py-3 rounded-lg border border-military-grey"
                  placeholder="Enter your name"
                  placeholderTextColor="#95a5a6"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View>
                <Text className="text-military-lightGrey mb-2 font-medium">
                  Rank *
                </Text>
                <TextInput
                  className="bg-military-blue text-white px-4 py-3 rounded-lg border border-military-grey"
                  placeholder="e.g., Captain"
                  placeholderTextColor="#95a5a6"
                  value={rank}
                  onChangeText={setRank}
                />
              </View>

              <View>
                <Text className="text-military-lightGrey mb-2 font-medium">
                  Unit *
                </Text>
                <TextInput
                  className="bg-military-blue text-white px-4 py-3 rounded-lg border border-military-grey"
                  placeholder="e.g., 5th Infantry Division"
                  placeholderTextColor="#95a5a6"
                  value={unit}
                  onChangeText={setUnit}
                />
              </View>

              <TouchableOpacity
                className={`py-4 rounded-lg mt-6 ${
                  isLoading ? 'bg-military-grey' : 'bg-military-green'
                }`}
                onPress={handleSendOtp}
                disabled={isLoading}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  {isLoading ? 'Checking...' : 'Send OTP'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <>
            <Text className="text-white text-3xl font-bold mb-2">
              Verify OTP
            </Text>
            <Text className="text-military-lightGrey text-lg mb-8">
              Enter the 6-digit code sent to {phone}
            </Text>

            <TextInput
              className="bg-military-blue text-white px-4 py-3 rounded-lg border border-military-grey text-center text-2xl tracking-widest"
              placeholder="000000"
              placeholderTextColor="#95a5a6"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
            />

            <View className="bg-military-blue rounded-lg p-4 mt-4">
              <Text className="text-military-grey text-sm">
                📱 Mock OTP: {generatedOtp}
              </Text>
            </View>

            <TouchableOpacity
              className={`py-4 rounded-lg mt-6 ${
                otp.length === 6 ? 'bg-military-green' : 'bg-military-grey opacity-50'
              }`}
              onPress={handleGenerateSeedPhrase}
              disabled={otp.length !== 6}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Verify & Continue
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Step 3: Seed Phrase */}
        {step === 3 && (
          <>
            <Text className="text-white text-3xl font-bold mb-2">
              Save Your Seed Phrase
            </Text>
            <Text className="text-military-lightGrey text-lg mb-4">
              Write down these 15 words in order
            </Text>
            
            <View className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
              <Text className="text-red-400 text-sm font-semibold mb-2">
                ⚠️ CRITICAL: Save This Securely
              </Text>
              <Text className="text-red-300 text-xs">
                This seed phrase is the ONLY way to recover your account. Store it offline and never share it.
              </Text>
            </View>

            <View className="bg-military-blue rounded-lg p-4 mb-6">
              <Text className="text-white text-base leading-7">
                {seedPhrase}
              </Text>
            </View>

            <TouchableOpacity
              className={`py-4 rounded-lg ${
                isLoading ? 'bg-military-grey' : 'bg-military-green'
              }`}
              onPress={handleVerifyAndComplete}
              disabled={isLoading}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {isLoading ? 'Completing Registration...' : 'I Have Saved It Securely'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};
