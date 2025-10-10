import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from '../../components/common/IconButton';
import { useTheme } from '../../contexts/ThemeContext';
import { MOCK_PENDING_MEMBERS } from '../../services/mock/MockData';

interface Notification {
  id: string;
  type: 'request' | 'mention' | 'update';
  title: string;
  message: string;
  timestamp: string;
  data?: any;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'request',
    title: 'New Member Request',
    message: 'Sgt. Thompson wants to join Alpha Squad',
    timestamp: '2 hours ago',
    data: MOCK_PENDING_MEMBERS[0],
  },
  {
    id: '2',
    type: 'request',
    title: 'New Member Request',
    message: 'Cpl. Davis wants to join Alpha Squad',
    timestamp: '1 day ago',
    data: MOCK_PENDING_MEMBERS[1],
  },
  {
    id: '3',
    type: 'mention',
    title: 'Mention in Alpha Squad',
    message: 'Capt. Miller mentioned you in a message',
    timestamp: '3 hours ago',
  },
  {
    id: '4',
    type: 'update',
    title: 'System Update',
    message: 'New security features are now available',
    timestamp: '1 day ago',
  },
];

export const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { theme, isDark } = useTheme();

  const handleApprove = (notification: Notification) => {
    Alert.alert('Approved', `${notification.data?.name} has been added to the group`);
  };

  const handleReject = (notification: Notification) => {
    Alert.alert('Rejected', `${notification.data?.name}'s request has been declined`);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'request':
        return 'person-add';
      case 'mention':
        return 'at';
      case 'update':
        return 'information-circle';
      default:
        return 'notifications';
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <View
      className="mx-4 mb-3 rounded-lg p-4"
      style={{
        backgroundColor: theme.colors.cardBg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.3 : 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View className="flex-row items-start">
        <View
          className="w-12 h-12 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: theme.colors.secondaryBg }}
        >
          <Ionicons
            name={getNotificationIcon(item.type)}
            size={24}
            color={item.type === 'request' ? theme.colors.accent : theme.colors.textSecondary}
          />
        </View>

        <View className="flex-1">
          <Text className="font-semibold mb-1" style={{ color: theme.colors.textPrimary }}>
            {item.title}
          </Text>
          <Text className="text-sm mb-2" style={{ color: theme.colors.textSecondary }}>
            {item.message}
          </Text>
          
          {item.type === 'request' && item.data && (
            <View className="mb-2 p-2 rounded-lg" style={{ backgroundColor: theme.colors.secondaryBg }}>
              <Text className="text-sm" style={{ color: theme.colors.textPrimary }}>
                {item.data.rank} • {item.data.unit}
              </Text>
            </View>
          )}

          <Text className="text-xs" style={{ color: theme.colors.textSecondary }}>
            {item.timestamp}
          </Text>

          {item.type === 'request' && (
            <View className="flex-row mt-3 gap-2">
              <TouchableOpacity
                className="flex-1 py-2 rounded-lg"
                style={{ backgroundColor: theme.colors.accent }}
                onPress={() => handleApprove(item)}
              >
                <Text className="text-white text-center font-semibold text-sm">
                  Approve
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-2 rounded-lg border"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: theme.colors.border,
                }}
                onPress={() => handleReject(item)}
              >
                <Text className="text-center font-semibold text-sm" style={{ color: theme.colors.textSecondary }}>
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
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
              Notifications
            </Text>
          </View>

          <IconButton
            name="checkmark-done"
            size={24}
            color={theme.colors.textPrimary}
            onPress={() => Alert.alert('Mark all as read')}
          />
        </View>
      </View>

      {/* Notifications List */}
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerClassName="py-4"
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="notifications-off-outline" size={64} color={theme.colors.textSecondary} />
            <Text className="text-lg mt-4" style={{ color: theme.colors.textSecondary }}>
              No notifications
            </Text>
          </View>
        }
      />
    </View>
  );
};
