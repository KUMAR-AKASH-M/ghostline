import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { MOCK_GROUPS, MOCK_DIRECT_CHATS } from '../../services/mock/MockData';
import { MemberApprovalModal } from '../../components/modals/MemberApprovalModal';
import { IconButton } from '../../components/common/IconButton';

type FilterType = 'all' | 'direct' | 'group';

export const ChatsListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const allChats = [
    ...MOCK_DIRECT_CHATS.map(chat => ({ ...chat, type: 'direct' as const })),
    ...MOCK_GROUPS.map(group => ({ ...group, type: 'group' as const })),
  ].sort((a, b) => {
    // Sort by timestamp (mock implementation)
    return 0;
  });

  const filteredChats = allChats.filter(chat => {
    const matchesFilter = activeFilter === 'all' || chat.type === activeFilter;
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const FilterButton: React.FC<{ filter: FilterType; label: string }> = ({ filter, label }) => (
    <TouchableOpacity
      onPress={() => setActiveFilter(filter)}
      className={`px-4 py-2 rounded-full mr-2 ${
        activeFilter === filter
          ? 'bg-military-green'
          : 'bg-military-blue border border-military-grey'
      }`}
    >
      <Text
        className={`font-semibold ${
          activeFilter === filter ? 'text-white' : 'text-military-lightGrey'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderChatItem = ({ item }: any) => (
    <TouchableOpacity
      className="flex-row items-center px-6 py-4 border-b border-military-grey/20 active:bg-military-blue/30"
      onPress={() =>
        navigation.navigate('Chat', {
          groupId: item.id,
          groupName: item.name,
          chatType: item.type,
        })
      }
    >
      {/* Avatar */}
      <View className="w-14 h-14 rounded-full bg-military-navy items-center justify-center mr-4">
        {item.type === 'group' ? (
          <MaterialIcons name="groups" size={28} color="#556B2F" />
        ) : (
          <Ionicons name="person" size={24} color="#556B2F" />
        )}
      </View>

      {/* Chat Info */}
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-white text-base font-semibold flex-1" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-military-grey text-xs ml-2">
            {item.timestamp}
          </Text>
        </View>
        
        <View className="flex-row justify-between items-center">
          <Text className="text-military-lightGrey text-sm flex-1" numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View className="bg-military-green rounded-full min-w-[20px] h-5 items-center justify-center px-1.5 ml-2">
              <Text className="text-white text-xs font-bold">
                {item.unread}
              </Text>
            </View>
          )}
        </View>
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
            <Text className="text-white text-xl font-bold">Messages</Text>
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
              placeholder="Search messages..."
              placeholderTextColor="#95a5a6"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#95a5a6" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Filters */}
      <View className="bg-military-dark px-6 py-3 border-b border-military-grey/20">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            { filter: 'all' as FilterType, label: 'All' },
            { filter: 'direct' as FilterType, label: 'Direct' },
            { filter: 'group' as FilterType, label: 'Groups' },
          ]}
          keyExtractor={(item) => item.filter}
          renderItem={({ item }) => (
            <FilterButton filter={item.filter} label={item.label} />
          )}
        />
      </View>

      {/* Pending Approvals Banner */}
      {activeFilter !== 'direct' && (
        <TouchableOpacity
          className="bg-military-green/20 border-l-4 border-military-green mx-4 mt-4 p-4 rounded-lg flex-row justify-between items-center"
          onPress={() => setShowApprovalModal(true)}
        >
          <View className="flex-row items-center flex-1">
            <Ionicons name="person-add" size={24} color="#556B2F" />
            <View className="ml-3 flex-1">
              <Text className="text-military-green font-semibold">
                2 Pending Requests
              </Text>
              <Text className="text-military-lightGrey text-sm">
                Review member approvals
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#556B2F" />
        </TouchableOpacity>
      )}

      {/* Chats List */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="chatbubbles-outline" size={64} color="#95a5a6" />
            <Text className="text-military-grey text-lg mt-4">
              No messages found
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
        onPress={() => {/* Navigate to new chat screen */}}
      >
        <Ionicons name="add" size={32} color="#ffffff" />
      </TouchableOpacity>

      <MemberApprovalModal
        visible={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
      />
    </View>
  );
};
