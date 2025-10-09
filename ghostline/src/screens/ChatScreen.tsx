import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useScreenshotProtection, disableCopyPaste } from '../services/security/ScreenshotProtection';
import { MOCK_MESSAGES } from '../services/mock/MockData';
import { IconButton } from '../components/common/IconButton';
import { useTheme } from '../contexts/ThemeContext';

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { theme, isDark } = useTheme();
  const { groupName, chatType } = route.params;

  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [showHeader, setShowHeader] = useState(true);

  useScreenshotProtection(true);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'You',
        content: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleLongPress = () => {
    Alert.alert('Restricted', 'Message forwarding is disabled for security');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.primaryBg }}>
      {/* Header */}
      <View
        className="px-4 pt-12 pb-4 shadow-lg"
        style={{ backgroundColor: theme.colors.secondaryBg }}
      >
        <View className="flex-row items-center">
          <IconButton
            name="arrow-back"
            size={24}
            color={theme.colors.textPrimary}
            onPress={() => navigation.goBack()}
          />

          <TouchableOpacity
            className="flex-row items-center flex-1 ml-3"
            onPress={() => setShowHeader(!showHeader)}
          >
            <View
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: theme.colors.cardBg }}
            >
              {chatType === 'group' ? (
                <MaterialIcons name="groups" size={24} color={theme.colors.accent} />
              ) : (
                <Ionicons name="person" size={20} color={theme.colors.accent} />
              )}
            </View>
            <View className="flex-1">
              <Text
                className="text-base font-semibold"
                style={{ color: theme.colors.textPrimary }}
                numberOfLines={1}
              >
                {groupName}
              </Text>
              {showHeader && (
                <Text className="text-xs" style={{ color: theme.colors.textSecondary }}>
                  {chatType === 'group' ? '12 members • Online' : 'Online'}
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <View className="flex-row">
            {chatType === 'group' && (
              <IconButton
                name="videocam"
                size={24}
                color={theme.colors.textPrimary}
                onPress={() => navigation.navigate('Call', { isVideoCall: true })}
                className="mr-3"
              />
            )}
            <IconButton
              name="call"
              size={24}
              color={theme.colors.textPrimary}
              onPress={() => navigation.navigate('Call', { isVideoCall: false })}
              className="mr-3"
            />
            <IconButton
              name="ellipsis-vertical"
              size={24}
              color={theme.colors.textPrimary}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        inverted={false}
        contentContainerClassName="p-4"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={handleLongPress}
            delayLongPress={500}
            className={`mb-3 max-w-[80%] ${item.isOwn ? 'self-end' : 'self-start'}`}
            activeOpacity={0.7}
          >
            {!item.isOwn && (
              <Text
                className="text-xs mb-1 ml-3 font-medium"
                style={{ color: theme.colors.textSecondary }}
              >
                {item.sender}
              </Text>
            )}
            <View
              className={`px-4 py-3 rounded-2xl ${
                item.isOwn ? 'rounded-br-none' : 'rounded-bl-none'
              }`}
              style={{
                backgroundColor: item.isOwn ? theme.colors.accent : theme.colors.cardBg,
                borderWidth: item.isOwn ? 0 : 1,
                borderColor: theme.colors.border,
              }}
            >
              <Text
                className="leading-5"
                style={{ color: item.isOwn ? '#FFFFFF' : theme.colors.textPrimary }}
              >
                {item.content}
              </Text>
            </View>
            <Text
              className={`text-xs mt-1 ${item.isOwn ? 'text-right mr-3' : 'ml-3'}`}
              style={{ color: theme.colors.textSecondary }}
            >
              {item.timestamp}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Input Bar */}
      <View
        className="px-4 py-3 border-t"
        style={{
          backgroundColor: theme.colors.secondaryBg,
          borderTopColor: theme.colors.border,
        }}
      >
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-2">
            <Ionicons name="add-circle" size={32} color={theme.colors.accent} />
          </TouchableOpacity>

          <View
            className="flex-1 rounded-full px-4 py-2 flex-row items-center"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            <TextInput
              className="flex-1"
              style={{ color: theme.colors.textPrimary }}
              placeholder="Type a message..."
              placeholderTextColor={theme.colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={1000}
              {...disableCopyPaste()}
            />
            <TouchableOpacity className="ml-2">
              <Ionicons name="happy-outline" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="ml-2 w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: theme.colors.accent }}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons
              name={inputText.trim() ? 'send' : 'mic'}
              size={20}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Security Watermark */}
      <View className="absolute bottom-20 right-4 opacity-10 pointer-events-none">
        <Ionicons name="shield-checkmark" size={40} color={theme.colors.textSecondary} />
      </View>
    </View>
  );
};
