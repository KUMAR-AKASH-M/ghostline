import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../contexts/ThemeContext';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { theme, isDark } = useTheme();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to change your profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
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
            Profile
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center py-8">
          <TouchableOpacity onPress={pickImage}>
            <View
              className="w-32 h-32 rounded-full items-center justify-center mb-4"
              style={{
                backgroundColor: profileImage ? 'transparent' : theme.colors.accent,
                shadowColor: theme.colors.accent,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  className="w-32 h-32 rounded-full"
                />
              ) : (
                <Ionicons name="shield-checkmark" size={64} color="#FFFFFF" />
              )}
              <View
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: theme.colors.accent }}
              >
                <Ionicons name="camera" size={20} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>
          
          <Text className="text-2xl font-bold" style={{ color: theme.colors.textPrimary }}>
            Capt. Miller
          </Text>
          <Text className="text-lg mt-2" style={{ color: theme.colors.textSecondary }}>
            Active Defense Personnel
          </Text>
        </View>

        {/* Profile Info */}
        <View className="px-6 pb-6">
          {/* Service ID */}
          <View
            className="rounded-lg p-4 mb-4 border"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-sm mb-1" style={{ color: theme.colors.textSecondary }}>
              Service ID / Army ID
            </Text>
            <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
              DEF2025001
            </Text>
          </View>

          {/* Full Name */}
          <View
            className="rounded-lg p-4 mb-4 border"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-sm mb-1" style={{ color: theme.colors.textSecondary }}>
              Full Name
            </Text>
            <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
              Captain John Miller
            </Text>
          </View>

          {/* Rank */}
          <View
            className="rounded-lg p-4 mb-4 border"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-sm mb-1" style={{ color: theme.colors.textSecondary }}>
              Rank
            </Text>
            <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
              Captain
            </Text>
          </View>

          {/* Unit */}
          <View
            className="rounded-lg p-4 mb-4 border"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-sm mb-1" style={{ color: theme.colors.textSecondary }}>
              Unit
            </Text>
            <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
              5th Infantry Division
            </Text>
          </View>

          {/* Phone Number */}
          <View
            className="rounded-lg p-4 mb-4 border"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderColor: theme.colors.border,
            }}
          >
            <Text className="text-sm mb-1" style={{ color: theme.colors.textSecondary }}>
              Phone Number
            </Text>
            <Text className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
              +91 98765 43210
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
