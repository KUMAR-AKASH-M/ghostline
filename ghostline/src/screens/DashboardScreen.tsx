import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { MOCK_GROUPS } from '../services/mock/MockData';
import { MemberApprovalModal } from '../components/modals/MemberApprovalModal';

interface DashboardScreenProps {
  onGroupPress: (groupId: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onGroupPress }) => {
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  return (
    <View className="flex-1 bg-military-dark">
      {/* Header */}
      <View className="bg-military-navy px-6 pt-12 pb-6">
        <Text className="text-white text-2xl font-bold">Groups</Text>
        <Text className="text-military-lightGrey mt-1">
          Secure Communication Channels
        </Text>
      </View>

      {/* Pending Approvals Banner */}
      <TouchableOpacity
        className="bg-military-green mx-4 mt-4 p-4 rounded-lg flex-row justify-between items-center"
        onPress={() => setShowApprovalModal(true)}
      >
        <View>
          <Text className="text-white font-semibold">
            2 Pending Member Requests
          </Text>
          <Text className="text-military-lightGrey text-sm">
            Tap to review
          </Text>
        </View>
        <Text className="text-white text-2xl">›</Text>
      </TouchableOpacity>

      {/* Groups List */}
      <FlatList
        data={MOCK_GROUPS}
        contentContainerClassName="p-4"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-military-blue p-4 rounded-lg mb-3 border border-military-grey"
            onPress={() => onGroupPress(item.id)}
          >
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold">
                  {item.name}
                </Text>
                <Text className="text-military-grey text-sm">
                  {item.members} members
                </Text>
              </View>
              {item.unread > 0 && (
                <View className="bg-military-green rounded-full w-6 h-6 items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {item.unread}
                  </Text>
                </View>
              )}
            </View>
            <Text className="text-military-lightGrey text-sm">
              {item.lastMessage}
            </Text>
            <Text className="text-military-grey text-xs mt-2">
              {item.timestamp}
            </Text>
          </TouchableOpacity>
        )}
      />

      <MemberApprovalModal
        visible={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
      />
    </View>
  );
};
