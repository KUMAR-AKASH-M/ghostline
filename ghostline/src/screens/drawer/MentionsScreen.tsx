import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Mention {
  id: string;
  message: string;
  sender: string;
  group: string;
  timestamp: string;
}

const MOCK_MENTIONS: Mention[] = [
  {
    id: '1',
    message: '@You We need status update on the mission briefing',
    sender: 'Capt. Miller',
    group: 'Alpha Squad',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    message: '@You Great work on yesterday\'s presentation',
    sender: 'Lt. Johnson',
    group: 'Command Center',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    message: '@You Don\'t forget the meeting at 1400',
    sender: 'Sgt. Thompson',
    group: 'Team Delta',
    timestamp: '2 days ago',
  },
];

export const MentionsScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-military-dark">
      {/* Header */}
      <View className="bg-military-navy px-6 pt-12 pb-6">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <Text className="text-white text-2xl">‹</Text>
          </TouchableOpacity>
          <View>
            <Text className="text-white text-2xl font-bold">Mentions</Text>
            <Text className="text-military-lightGrey mt-1">
              Messages that mention you
            </Text>
          </View>
        </View>
      </View>

      {/* Mentions List */}
      <FlatList
        data={MOCK_MENTIONS}
        contentContainerClassName="p-4"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-military-blue p-4 rounded-lg mb-3 border-l-4 border-military-green"
            onPress={() =>
              navigation.navigate('Chat', {
                groupId: item.id,
                groupName: item.group,
              })
            }
          >
            <View className="flex-row justify-between mb-2">
              <Text className="text-white font-semibold">{item.sender}</Text>
              <Text className="text-military-grey text-xs">{item.timestamp}</Text>
            </View>
            <Text className="text-military-lightGrey text-sm mb-2">
              {item.message}
            </Text>
            <Text className="text-military-grey text-xs">
              in {item.group}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="text-military-grey text-lg">No mentions yet</Text>
          </View>
        }
      />
    </View>
  );
};
