import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
// import { LinearGradient } from 'expo-linear-gradient';

export const VoiceVideoCallScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { isVideoCall } = route.params;
  const { theme, isDark } = useTheme();

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(isVideoCall);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [networkStrength, setNetworkStrength] = useState<'excellent' | 'good' | 'poor'>('excellent');

  const getNetworkColor = () => {
    if (networkStrength === 'excellent') return theme.colors.success;
    if (networkStrength === 'good') return theme.colors.warning;
    return theme.colors.error;
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.primaryBg }}>
      {/* Network Indicator */}
      <View
        className="absolute top-12 right-4 flex-row items-center px-3 py-2 rounded-full z-10"
        style={{
          backgroundColor: isDark ? theme.colors.cardBg : theme.colors.cardBg,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <View
          className="w-2 h-2 rounded-full mr-2"
          style={{ backgroundColor: getNetworkColor() }}
        />
        <Ionicons name="wifi" size={16} color={getNetworkColor()} />
        <Text
          className="text-xs ml-2 capitalize font-medium"
          style={{ color: theme.colors.textPrimary }}
        >
          {networkStrength}
        </Text>
      </View>

      {/* Video/Audio Display Area */}
      <View className="flex-1 justify-center items-center">
        {isVideoCall && isCameraOn ? (
          <View
            className="w-full h-full items-center justify-center"
            style={{ backgroundColor: theme.colors.secondaryBg }}
          >
            <MaterialIcons
              name="videocam"
              size={80}
              color={theme.colors.textSecondary}
            />
            <Text
              className="text-lg mt-4"
              style={{ color: theme.colors.textSecondary }}
            >
              Video Stream (Simulated)
            </Text>
          </View>
        ) : (
          <View className="items-center">
            <View
              className="w-32 h-32 rounded-full items-center justify-center mb-6"
              style={{
                backgroundColor: isDark ? theme.colors.cardBg : theme.colors.secondaryBg,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Ionicons name="person" size={60} color={theme.colors.accent} />
            </View>
            <Text
              className="text-2xl font-bold"
              style={{ color: theme.colors.textPrimary }}
            >
              Capt. Miller
            </Text>
            <Text
              className="mt-2 text-base"
              style={{ color: theme.colors.textSecondary }}
            >
              {isVideoCall ? 'Video Call' : 'Voice Call'} • 05:32
            </Text>
          </View>
        )}
      </View>

      {/* Call Controls */}
      <View className="px-6 pb-12" style={{ backgroundColor: theme.colors.secondaryBg }}>
        <View className="flex-row justify-around items-center mb-6 pt-6">
          {/* Mute Button */}
          <TouchableOpacity
            className="items-center"
            onPress={() => setIsMuted(!isMuted)}
          >
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{
                backgroundColor: isMuted ? theme.colors.error : theme.colors.cardBg,
                shadowColor: isMuted ? theme.colors.error : '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Ionicons
                name={isMuted ? 'mic-off' : 'mic'}
                size={28}
                color={isMuted ? '#FFFFFF' : theme.colors.textPrimary}
              />
            </View>
            <Text
              className="text-xs mt-2 font-medium"
              style={{ color: theme.colors.textSecondary }}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </Text>
          </TouchableOpacity>

          {/* Camera Toggle (Video calls only) */}
          {isVideoCall && (
            <TouchableOpacity
              className="items-center"
              onPress={() => setIsCameraOn(!isCameraOn)}
            >
              <View
                className="w-16 h-16 rounded-full items-center justify-center"
                style={{
                  backgroundColor: isCameraOn ? theme.colors.cardBg : theme.colors.error,
                  shadowColor: !isCameraOn ? theme.colors.error : '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Ionicons
                  name={isCameraOn ? 'videocam' : 'videocam-off'}
                  size={28}
                  color={isCameraOn ? theme.colors.textPrimary : '#FFFFFF'}
                />
              </View>
              <Text
                className="text-xs mt-2 font-medium"
                style={{ color: theme.colors.textSecondary }}
              >
                Camera
              </Text>
            </TouchableOpacity>
          )}

          {/* Speaker Toggle */}
          <TouchableOpacity
            className="items-center"
            onPress={() => setIsSpeakerOn(!isSpeakerOn)}
          >
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{
                backgroundColor: isSpeakerOn ? theme.colors.accent : theme.colors.cardBg,
                shadowColor: isSpeakerOn ? theme.colors.accent : '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Ionicons
                name={isSpeakerOn ? 'volume-high' : 'volume-medium'}
                size={28}
                color={isSpeakerOn ? '#FFFFFF' : theme.colors.textPrimary}
              />
            </View>
            <Text
              className="text-xs mt-2 font-medium"
              style={{ color: theme.colors.textSecondary }}
            >
              Speaker
            </Text>
          </TouchableOpacity>

          {/* End Call Button */}
          <TouchableOpacity
            className="items-center"
            onPress={() => navigation.goBack()}
          >
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{
                backgroundColor: theme.colors.error,
                shadowColor: theme.colors.error,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Ionicons name="call" size={28} color="#FFFFFF" style={{ transform: [{ rotate: '135deg' }] }} />
            </View>
            <Text
              className="text-xs mt-2 font-medium"
              style={{ color: theme.colors.error }}
            >
              End
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-center mt-4">
          <Ionicons name="shield-checkmark" size={16} color={theme.colors.accent} />
          <Text
            className="text-sm ml-2"
            style={{ color: theme.colors.textSecondary }}
          >
            End-to-end encrypted call
          </Text>
        </View>
      </View>
    </View>
  );
};
