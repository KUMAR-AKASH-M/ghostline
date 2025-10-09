import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_PENDING_MEMBERS } from '../../services/mock/MockData';
import { useTheme } from '../../contexts/ThemeContext';

interface MemberApprovalModalProps {
  visible: boolean;
  onClose: () => void;
}

export const MemberApprovalModal: React.FC<MemberApprovalModalProps> = ({
  visible,
  onClose,
}) => {
  const { theme, isDark } = useTheme();

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
      <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View
          className="rounded-t-3xl max-h-[80%]"
          style={{ backgroundColor: theme.colors.primaryBg }}
        >
          {/* Header */}
          <View
            className="p-6 border-b"
            style={{ borderBottomColor: theme.colors.border }}
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-bold" style={{ color: theme.colors.textPrimary }}>
                Pending Approvals
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={28} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text className="mt-1" style={{ color: theme.colors.textSecondary }}>
              Review membership requests
            </Text>
          </View>

          {/* Members List */}
          <FlatList
            data={MOCK_PENDING_MEMBERS}
            contentContainerClassName="p-4"
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                className="p-4 rounded-lg mb-3"
                style={{
                  backgroundColor: theme.colors.cardBg,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
              >
                <Text className="font-semibold text-lg" style={{ color: theme.colors.textPrimary }}>
                  {item.name}
                </Text>
                <Text className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  {item.rank} • {item.unit}
                </Text>
                <Text className="text-xs mt-1" style={{ color: theme.colors.textSecondary }}>
                  Requested {item.requestDate}
                </Text>

                <View className="flex-row mt-4 space-x-2">
                  <TouchableOpacity
                    className="flex-1 py-3 rounded-lg mr-2"
                    style={{ backgroundColor: theme.colors.accent }}
                    onPress={() => handleApprove(item.id, item.name)}
                  >
                    <Text className="text-white text-center font-semibold">
                      Approve
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 py-3 rounded-lg border"
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: theme.colors.border,
                    }}
                    onPress={() => handleReject(item.id, item.name)}
                  >
                    <Text className="text-center font-semibold" style={{ color: theme.colors.textSecondary }}>
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
