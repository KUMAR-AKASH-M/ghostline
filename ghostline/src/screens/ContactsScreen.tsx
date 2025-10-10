import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

interface Contact {
  id: string;
  name: string;
  relation: string;
  relationType: 'professional' | 'family';
  status: 'online' | 'offline';
}

const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Capt. Miller', relation: 'Captain', relationType: 'professional', status: 'online' },
  { id: '2', name: 'Lt. Johnson', relation: 'Lieutenant', relationType: 'professional', status: 'online' },
  { id: '3', name: 'Sgt. Thompson', relation: 'Sergeant', relationType: 'professional', status: 'offline' },
  { id: '4', name: 'John Miller', relation: 'Father', relationType: 'family', status: 'online' },
  { id: '5', name: 'Sarah Miller', relation: 'Mother', relationType: 'family', status: 'online' },
];

export const ContactsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { theme, isDark } = useTheme();

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      className="flex-row items-center p-4 rounded-lg mb-2"
      style={{
        backgroundColor: theme.colors.cardBg,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
      onPress={() =>
        navigation.navigate('Chat', {
          groupId: item.id,
          groupName: item.name,
          chatType: 'direct',
        })
      }
    >
      <View
        className="w-14 h-14 rounded-full items-center justify-center mr-4"
        style={{ backgroundColor: theme.colors.secondaryBg }}
      >
        <Ionicons name="person" size={26} color={theme.colors.accent} />
      </View>

      <View className="flex-1">
        <Text className="font-semibold text-base" style={{ color: theme.colors.textPrimary }}>
          {item.name}
        </Text>
        <View className="flex-row items-center mt-1">
          <View
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: item.status === 'online' ? theme.colors.success : theme.colors.textSecondary }}
          />
          <Text className="text-sm" style={{ color: theme.colors.textSecondary }}>
            {item.relation}
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.primaryBg }}>
      {/* Header */}
      <View
        className="px-4 pt-12 pb-4 shadow-lg"
        style={{ backgroundColor: theme.colors.secondaryBg }}
      >
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold" style={{ color: theme.colors.textPrimary }}>
              Contacts
            </Text>
            <Text className="text-sm" style={{ color: theme.colors.textSecondary }}>
              Manage your connections
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Quick Actions */}
        <View className="p-4">
          <TouchableOpacity
            className="flex-row items-center p-4 rounded-lg mb-3"
            style={{
              backgroundColor: theme.colors.accent,
              shadowColor: theme.colors.accent,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
            onPress={() => navigation.navigate('CreateGroup')}
          >
            <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
              <MaterialIcons name="group-add" size={24} color="#FFFFFF" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-base">Create Group</Text>
              <Text className="text-white/80 text-sm">Start a new group chat</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center p-4 rounded-lg border"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderColor: theme.colors.accent,
            }}
            onPress={() => navigation.navigate('AddContact')}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-4"
              style={{ backgroundColor: `${theme.colors.accent}20` }}
            >
              <Ionicons name="person-add" size={24} color={theme.colors.accent} />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-base" style={{ color: theme.colors.textPrimary }}>
                Add Contact
              </Text>
              <Text className="text-sm" style={{ color: theme.colors.textSecondary }}>
                Send a connection request
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Contacts List */}
        <View className="px-4 pb-4">
          <Text className="font-bold mb-3" style={{ color: theme.colors.textPrimary }}>
            All Contacts ({MOCK_CONTACTS.length})
          </Text>
          <FlatList
            data={MOCK_CONTACTS}
            keyExtractor={(item) => item.id}
            renderItem={renderContact}
            scrollEnabled={false}
            ListEmptyComponent={
              <View className="items-center py-12">
                <Ionicons name="people-outline" size={64} color={theme.colors.textSecondary} />
                <Text className="text-lg mt-4" style={{ color: theme.colors.textSecondary }}>
                  No contacts yet
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};
