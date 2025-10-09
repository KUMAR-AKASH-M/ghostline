import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface StarredMessage {
  id: string;
  message: string;
  sender: string;
  group: string;
  timestamp: string;
}

const MOCK_STARRED: StarredMessage[] = [
  {
    id: '1',
    message: 'Mission briefing scheduled for 1400 hours. All personnel must attend.',
    sender: 'Capt. Miller',
    group: 'Alpha Squad',
    timestamp: 'Oct 5, 2025',
  },
  {
    id: '2',
    message: 'Remember to check equipment before deployment',
    sender: 'You',
    group: 'Team Delta',
    timestamp: 'Oct 3, 2025',
  },
];

export const StarredMessagesScreen: React.FC = () => {
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
            <Text className="text-white text-2xl font-bold">Starred Messages</Text>
            <Text className="text-military-lightGrey mt-1">
              Important saved messages
            </Text>
          </View>
        </View>
      </View>

      {/* Starred Messages List */}
      <FlatList
        data={MOCK_STARRED}
        contentContainerClassName="p-4"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-military-blue p-4 rounded-lg mb-3"
            onPress={() =>
              navigation.navigate('Chat', {
                groupId: item.id,
                groupName: item.group,
              })
            }
          >
            <View className="flex-row items-start mb-2">
              <Text className="text-yellow-500 text-xl mr-2">⭐</Text>
              <View className="flex-1">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-white font-semibold">{item.sender}</Text>
                  <Text className="text-military-grey text-xs">{item.timestamp}</Text>
                </View>
                <Text className="text-military-lightGrey">{item.message}</Text>
                <Text className="text-military-grey text-xs mt-2">
                  in {item.group}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="text-military-grey text-lg">
              No starred messages
            </Text>
          </View>
        }
      />
    </View>
  );
};
