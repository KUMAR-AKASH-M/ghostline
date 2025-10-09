import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useScreenshotProtection, disableCopyPaste } from '../services/security/ScreenshotProtection';
import { MOCK_MESSAGES } from '../services/mock/MockData';
import { IconButton } from '../components/common/IconButton';

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { groupName, chatType } = route.params;

  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [showHeader, setShowHeader] = useState(true);

  // Enable screenshot protection for chat screen
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
    <View className="flex-1 bg-military-dark">
      {/* Header */}
      <View className="bg-military-navy px-4 pt-12 pb-4 shadow-lg">
        <View className="flex-row items-center">
          {/* Back Button */}
          <IconButton
            name="arrow-back"
            size={24}
            color="#ffffff"
            onPress={() => navigation.goBack()}
          />

          {/* Avatar & Name */}
          <TouchableOpacity
            className="flex-row items-center flex-1 ml-3"
            onPress={() => setShowHeader(!showHeader)}
          >
            <View className="w-10 h-10 rounded-full bg-military-blue items-center justify-center mr-3">
              {chatType === 'group' ? (
                <MaterialIcons name="groups" size={24} color="#556B2F" />
              ) : (
                <Ionicons name="person" size={20} color="#556B2F" />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-semibold" numberOfLines={1}>
                {groupName}
              </Text>
              {showHeader && (
                <Text className="text-military-grey text-xs">
                  {chatType === 'group' ? '12 members • Online' : 'Online'}
                </Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Actions */}
          <View className="flex-row">
            {chatType === 'group' && (
              <IconButton
                name="videocam"
                size={24}
                color="#ffffff"
                onPress={() => navigation.navigate('Call', { isVideoCall: true })}
                className="mr-3"
              />
            )}
            <IconButton
              name="call"
              size={24}
              color="#ffffff"
              onPress={() => navigation.navigate('Call', { isVideoCall: false })}
              className="mr-3"
            />
            <IconButton
              name="ellipsis-vertical"
              size={24}
              color="#ffffff"
              onPress={() => {/* Show menu */}}
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
            className={`mb-3 max-w-[80%] ${
              item.isOwn ? 'self-end' : 'self-start'
            }`}
            activeOpacity={0.7}
          >
            {!item.isOwn && (
              <Text className="text-military-grey text-xs mb-1 ml-3 font-medium">
                {item.sender}
              </Text>
            )}
            <View
              className={`px-4 py-3 rounded-2xl ${
                item.isOwn
                  ? 'bg-military-green rounded-br-none'
                  : 'bg-military-blue rounded-bl-none border border-military-grey/30'
              }`}
            >
              <Text className="text-white leading-5">{item.content}</Text>
            </View>
            <Text
              className={`text-military-grey text-xs mt-1 ${
                item.isOwn ? 'text-right mr-3' : 'ml-3'
              }`}
            >
              {item.timestamp}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Input Bar */}
      <View className="bg-military-navy px-4 py-3 border-t border-military-grey/20">
        <View className="flex-row items-center">
          {/* Attachment Button */}
          <TouchableOpacity className="mr-2">
            <Ionicons name="add-circle" size={32} color="#556B2F" />
          </TouchableOpacity>

          {/* Text Input */}
          <View className="flex-1 bg-military-blue rounded-full px-4 py-2 flex-row items-center">
            <TextInput
              className="flex-1 text-white"
              placeholder="Type a message..."
              placeholderTextColor="#95a5a6"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={1000}
              {...disableCopyPaste()}
            />
            <TouchableOpacity className="ml-2">
              <Ionicons name="happy-outline" size={24} color="#95a5a6" />
            </TouchableOpacity>
          </View>

          {/* Send Button */}
          <TouchableOpacity
            className="ml-2 w-10 h-10 bg-military-green rounded-full items-center justify-center"
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
        <Ionicons name="shield-checkmark" size={40} color="#ffffff" />
      </View>
    </View>
  );
};
