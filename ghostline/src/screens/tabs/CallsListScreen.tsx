import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { IconButton } from '../../components/common/IconButton';

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
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalls = MOCK_CALLS.filter(call =>
    call.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCallIcon = (call: Call) => {
    if (call.type === 'missed') {
      return <Ionicons name="call-outline" size={20} color="#ef4444" />;
    }
    if (call.type === 'incoming') {
      return <Ionicons name="arrow-down" size={20} color="#556B2F" />;
    }
    return <Ionicons name="arrow-up" size={20} color="#95a5a6" />;
  };

  const renderCallItem = ({ item }: { item: Call }) => (
    <TouchableOpacity
      className="flex-row items-center px-6 py-4 border-b border-military-grey/20 active:bg-military-blue/30"
      onPress={() =>
        navigation.navigate('Call', {
          callId: item.id,
          isVideoCall: item.callType === 'video',
        })
      }
    >
      {/* Avatar */}
      <View className="w-12 h-12 rounded-full bg-military-navy items-center justify-center mr-4">
        <Ionicons name="person" size={24} color="#556B2F" />
      </View>

      {/* Call Info */}
      <View className="flex-1">
        <Text className="text-white text-base font-semibold mb-1">
          {item.name}
        </Text>
        <View className="flex-row items-center">
          {getCallIcon(item)}
          <Text
            className={`text-sm ml-2 ${
              item.type === 'missed' ? 'text-red-400' : 'text-military-lightGrey'
            }`}
          >
            {item.callType === 'video' ? 'Video' : 'Voice'} • {item.timestamp}
          </Text>
        </View>
      </View>

      {/* Duration & Call Button */}
      <View className="items-end">
        {item.duration && (
          <Text className="text-military-grey text-sm mb-2">{item.duration}</Text>
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
            color="#556B2F"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-military-dark">
      {/* Header */}
      <View className="bg-military-navy px-4 pt-12 pb-4 shadow-lg">
        <View className="flex-row items-center justify-between">
          {/* Left: Drawer Menu */}
          <IconButton
            name="menu"
            size={28}
            color="#ffffff"
            onPress={() => navigation.openDrawer()}
          />

          {/* Center: Title */}
          <View className="flex-1 mx-4">
            <Text className="text-white text-xl font-bold">Calls</Text>
          </View>

          {/* Right: Search */}
          <IconButton
            name={searchVisible ? 'close' : 'search'}
            size={24}
            color="#ffffff"
            onPress={() => {
              setSearchVisible(!searchVisible);
              if (searchVisible) setSearchQuery('');
            }}
          />
        </View>

        {/* Search Bar */}
        {searchVisible && (
          <View className="mt-3 flex-row items-center bg-military-dark/50 rounded-lg px-3 py-2">
            <Ionicons name="search" size={20} color="#95a5a6" />
            <TextInput
              className="flex-1 text-white ml-2 py-1"
              placeholder="Search calls..."
              placeholderTextColor="#95a5a6"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>
        )}
      </View>

      {/* Call Stats */}
      <View className="flex-row px-6 py-4 gap-3">
        <View className="flex-1 bg-military-blue/40 p-4 rounded-lg border border-military-grey/30">
          <View className="flex-row items-center mb-2">
            <Ionicons name="call" size={20} color="#556B2F" />
            <Text className="text-military-green text-2xl font-bold ml-2">24</Text>
          </View>
          <Text className="text-military-grey text-sm">Total Calls</Text>
        </View>
        <View className="flex-1 bg-military-blue/40 p-4 rounded-lg border border-military-grey/30">
          <View className="flex-row items-center mb-2">
            <Ionicons name="time-outline" size={20} color="#556B2F" />
            <Text className="text-military-green text-2xl font-bold ml-2">3h 42m</Text>
          </View>
          <Text className="text-military-grey text-sm">This Week</Text>
        </View>
      </View>

      {/* Calls List */}
      <FlatList
        data={filteredCalls}
        keyExtractor={(item) => item.id}
        renderItem={renderCallItem}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="call-outline" size={64} color="#95a5a6" />
            <Text className="text-military-grey text-lg mt-4">
              No calls found
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 w-16 h-16 bg-military-green rounded-full items-center justify-center shadow-lg"
        style={{
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
