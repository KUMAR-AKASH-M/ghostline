import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { MOCK_PENDING_MEMBERS } from '../../services/mock/MockData';

interface MemberApprovalModalProps {
  visible: boolean;
  onClose: () => void;
}

export const MemberApprovalModal: React.FC<MemberApprovalModalProps> = ({
  visible,
  onClose,
}) => {
  const handleApprove = (memberId: string, name: string) => {
    Alert.alert('Approved', `${name} has been added to the group`);
  };

  const handleReject = (memberId: string, name: string) => {
    Alert.alert('Rejected', `${name}'s request has been declined`);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-military-dark rounded-t-3xl max-h-[80%]">
          {/* Header */}
          <View className="p-6 border-b border-military-grey">
            <View className="flex-row justify-between items-center">
              <Text className="text-white text-xl font-bold">
                Pending Approvals
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text className="text-military-grey text-2xl">×</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-military-grey mt-1">
              Review membership requests
            </Text>
          </View>

          {/* Members List */}
          <FlatList
            data={MOCK_PENDING_MEMBERS}
            contentContainerClassName="p-4"
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="bg-military-blue p-4 rounded-lg mb-3">
                <Text className="text-white font-semibold text-lg">
                  {item.name}
                </Text>
                <Text className="text-military-lightGrey text-sm">
                  {item.rank} • {item.unit}
                </Text>
                <Text className="text-military-grey text-xs mt-1">
                  Requested {item.requestDate}
                </Text>

                <View className="flex-row mt-4 space-x-2">
                  <TouchableOpacity
                    className="flex-1 bg-military-green py-3 rounded-lg mr-2"
                    onPress={() => handleApprove(item.id, item.name)}
                  >
                    <Text className="text-white text-center font-semibold">
                      Approve
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 bg-military-grey py-3 rounded-lg"
                    onPress={() => handleReject(item.id, item.name)}
                  >
                    <Text className="text-white text-center font-semibold">
                      Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};
