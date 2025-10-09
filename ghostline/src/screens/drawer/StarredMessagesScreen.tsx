import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

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
  const { theme, isDark } = useTheme();

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
          <View>
            <Text className="text-2xl font-bold" style={{ color: theme.colors.textPrimary }}>
              Starred Messages
            </Text>
            <Text className="mt-1" style={{ color: theme.colors.textSecondary }}>
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
            className="p-4 rounded-lg mb-3"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
            onPress={() =>
              navigation.navigate('Chat', {
                groupId: item.id,
                groupName: item.group,
              })
            }
          >
            <View className="flex-row items-start mb-2">
              <Ionicons name="star" size={20} color={theme.colors.warning} />
              <View className="flex-1 ml-2">
                <View className="flex-row justify-between mb-1">
                  <Text className="font-semibold" style={{ color: theme.colors.textPrimary }}>
                    {item.sender}
                  </Text>
                  <Text className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    {item.timestamp}
                  </Text>
                </View>
                <Text style={{ color: theme.colors.textSecondary }}>
                  {item.message}
                </Text>
                <Text className="text-xs mt-2" style={{ color: theme.colors.textSecondary }}>
                  in {item.group}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="text-lg" style={{ color: theme.colors.textSecondary }}>
              No starred messages
            </Text>
          </View>
        }
      />
    </View>
  );
};
