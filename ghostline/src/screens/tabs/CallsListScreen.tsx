import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from '../../components/common/IconButton';
import { useTheme } from '../../contexts/ThemeContext';

interface Call {
  id: string;
  name: string;
  type: 'incoming' | 'outgoing' | 'missed';
  callType: 'voice' | 'video';
  timestamp: string;
  duration?: string;
}

const MOCK_CALLS: Call[] = [
  {
    id: '1',
    name: 'Capt. Miller',
    type: 'incoming',
    callType: 'video',
    timestamp: '10:30 AM',
    duration: '12:45',
  },
  {
    id: '2',
    name: 'Lt. Johnson',
    type: 'outgoing',
    callType: 'voice',
    timestamp: 'Yesterday',
    duration: '05:23',
  },
  {
    id: '3',
    name: 'Sgt. Thompson',
    type: 'missed',
    callType: 'voice',
    timestamp: '2 days ago',
  },
  {
    id: '4',
    name: 'Alpha Squad',
    type: 'outgoing',
    callType: 'video',
    timestamp: '3 days ago',
    duration: '45:12',
  },
];

export const CallsListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { theme, isDark } = useTheme();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalls = MOCK_CALLS.filter(call =>
    call.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCallIcon = (call: Call) => {
    if (call.type === 'missed') {
      return <Ionicons name="call-outline" size={20} color={theme.colors.error} />;
    }
    if (call.type === 'incoming') {
      return <Ionicons name="arrow-down" size={20} color={theme.colors.accent} />;
    }
    return <Ionicons name="arrow-up" size={20} color={theme.colors.textSecondary} />;
  };

  const renderCallItem = ({ item }: { item: Call }) => (
    <TouchableOpacity
      className="flex-row items-center px-6 py-4"
      style={{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      }}
      onPress={() =>
        navigation.navigate('Call', {
          callId: item.id,
          isVideoCall: item.callType === 'video',
        })
      }
    >
      {/* Avatar */}
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-4"
        style={{ backgroundColor: theme.colors.secondaryBg }}
      >
        <Ionicons name="person" size={24} color={theme.colors.accent} />
      </View>

      {/* Call Info */}
      <View className="flex-1">
        <Text className="text-base font-semibold mb-1" style={{ color: theme.colors.textPrimary }}>
          {item.name}
        </Text>
        <View className="flex-row items-center">
          {getCallIcon(item)}
          <Text
            className="text-sm ml-2"
            style={{
              color: item.type === 'missed' ? theme.colors.error : theme.colors.textSecondary,
            }}
          >
            {item.callType === 'video' ? 'Video' : 'Voice'} • {item.timestamp}
          </Text>
        </View>
      </View>

      {/* Duration & Call Button */}
      <View className="items-end">
        {item.duration && (
          <Text className="text-sm mb-2" style={{ color: theme.colors.textSecondary }}>
            {item.duration}
          </Text>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Call', {
              callId: item.id,
              isVideoCall: item.callType === 'video',
            })
          }
        >
          <Ionicons
            name={item.callType === 'video' ? 'videocam' : 'call'}
            size={24}
            color={theme.colors.accent}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.primaryBg }}>
      {/* Header */}
      <View
        className="px-4 pt-12 pb-4 shadow-lg"
        style={{ backgroundColor: theme.colors.secondaryBg }}
      >
        <View className="flex-row items-center justify-between">
          <IconButton
            name="menu"
            size={28}
            color={theme.colors.textPrimary}
            onPress={() => navigation.openDrawer()}
          />

          <View className="flex-1 mx-4">
            <Text className="text-xl font-bold" style={{ color: theme.colors.textPrimary }}>
              Calls
            </Text>
          </View>

          <IconButton
            name={searchVisible ? 'close' : 'search'}
            size={24}
            color={theme.colors.textPrimary}
            onPress={() => {
              setSearchVisible(!searchVisible);
              if (searchVisible) setSearchQuery('');
            }}
          />
        </View>

        {/* Search Bar */}
        {searchVisible && (
          <View
            className="mt-3 flex-row items-center rounded-lg px-3 py-2"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
            <TextInput
              className="flex-1 ml-2 py-1"
              style={{ color: theme.colors.textPrimary }}
              placeholder="Search calls..."
              placeholderTextColor={theme.colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>
        )}
      </View>

      {/* Call Stats */}
      <View className="flex-row px-6 py-4 gap-3">
        <View
          className="flex-1 p-4 rounded-lg border"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.border,
          }}
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="call" size={20} color={theme.colors.accent} />
            <Text className="text-2xl font-bold ml-2" style={{ color: theme.colors.accent }}>
              24
            </Text>
          </View>
          <Text className="text-sm" style={{ color: theme.colors.textSecondary }}>
            Total Calls
          </Text>
        </View>
        <View
          className="flex-1 p-4 rounded-lg border"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.border,
          }}
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="time-outline" size={20} color={theme.colors.accent} />
            <Text className="text-2xl font-bold ml-2" style={{ color: theme.colors.accent }}>
              3h 42m
            </Text>
          </View>
          <Text className="text-sm" style={{ color: theme.colors.textSecondary }}>
            This Week
          </Text>
        </View>
      </View>

      {/* Calls List */}
      <FlatList
        data={filteredCalls}
        keyExtractor={(item) => item.id}
        renderItem={renderCallItem}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="call-outline" size={64} color={theme.colors.textSecondary} />
            <Text className="text-lg mt-4" style={{ color: theme.colors.textSecondary }}>
              No calls found
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 w-16 h-16 rounded-full items-center justify-center shadow-lg"
        style={{
          backgroundColor: theme.colors.accent,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
        onPress={() => navigation.navigate('Call', { isVideoCall: false })}
      >
        <Ionicons name="call" size={28} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};
