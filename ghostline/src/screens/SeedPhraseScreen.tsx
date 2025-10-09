import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthService } from '../services/auth/AuthService';
import { TEST_USERS } from '../services/mock/MockData';

interface SeedPhraseScreenProps {
  onSuccess: () => void;
}

export const SeedPhraseScreen: React.FC<SeedPhraseScreenProps> = ({ onSuccess }) => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { armyId, phone, publicKey, encryptedPrivateKey } = route.params;
  
  const [seedPhrase, setSeedPhrase] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifySeedPhrase = async () => {
    const trimmedPhrase = seedPhrase.trim();
    
    if (!trimmedPhrase) {
      Alert.alert('Error', 'Please enter your seed phrase');
      return;
    }

    // Validate seed phrase format (15 words)
    const words = trimmedPhrase.split(/\s+/);
    if (words.length !== 15) {
      Alert.alert('Error', 'Seed phrase must contain exactly 15 words');
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.validateSeedPhrase(
        armyId,
        phone,
        publicKey,
        encryptedPrivateKey,
        trimmedPhrase
      );
      
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: onSuccess },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fillTestSeedPhrase = () => {
    setSeedPhrase(TEST_USERS.personnel.seedPhrase);
  };

  return (
    <View className="flex-1 bg-military-dark">
      <ScrollView className="flex-1 px-6 pt-12">
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          className="mb-6"
        >
          <Text className="text-military-green text-lg">← Back</Text>
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold mb-2">
          Enter Seed Phrase
        </Text>
        <Text className="text-military-lightGrey text-lg mb-4">
          Enter your 15-word seed phrase to decrypt your private key
        </Text>

        <View className="bg-military-blue/50 border border-military-green rounded-lg p-4 mb-6">
          <Text className="text-military-green text-sm font-semibold mb-2">
            🔐 How This Works:
          </Text>
          <Text className="text-military-lightGrey text-xs leading-5">
            Your private key is encrypted using:{'\n'}
            1. Your seed phrase (15 words){'\n'}
            2. ArmyID + Phone + PublicKey (SHA256){'\n\n'}
            Without your seed phrase, the private key cannot be decrypted - even by the server.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-military-lightGrey mb-2 font-medium">
            Seed Phrase (15 words)
          </Text>
          <TextInput
            className="bg-military-blue text-white px-4 py-4 rounded-lg border border-military-grey min-h-32"
            placeholder="Enter your seed phrase (15 words separated by spaces)"
            placeholderTextColor="#95a5a6"
            value={seedPhrase}
            onChangeText={setSeedPhrase}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text className="text-military-grey text-xs mt-2">
            {seedPhrase.trim().split(/\s+/).filter(w => w).length} / 15 words
          </Text>
        </View>

        <TouchableOpacity
          className={`py-4 rounded-lg mb-4 ${
            isLoading ? 'bg-military-grey' : 'bg-military-green'
          }`}
          onPress={handleVerifySeedPhrase}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {isLoading ? 'Decrypting...' : 'Verify & Login'}
          </Text>
        </TouchableOpacity>

        {/* Test Helper */}
        <View className="bg-military-blue rounded-lg p-4 mt-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-military-lightGrey text-xs">
              Test Seed Phrase:
            </Text>
            <TouchableOpacity onPress={fillTestSeedPhrase}>
              <Text className="text-military-green text-xs font-semibold">
                Auto Fill →
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-white text-xs leading-5">
            {TEST_USERS.personnel.seedPhrase}
          </Text>
        </View>

        <View className="bg-red-900/20 border border-red-500 rounded-lg p-4 mt-6 mb-8">
          <Text className="text-red-400 text-xs font-semibold mb-2">
            ⚠️ Security Notice
          </Text>
          <Text className="text-red-300 text-xs">
            Never share your seed phrase with anyone. Defense Secure will never ask for your seed phrase via email or phone.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
