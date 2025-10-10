import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { SecureStorage } from '../services/security/SecureStorage';
import { useTheme } from '../contexts/ThemeContext';

interface DrawerItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { theme, isDark } = useTheme();
  
  const drawerItems: DrawerItem[] = [
    { label: 'Profile', icon: 'person-outline', route: 'Profile' },
    { label: 'Starred Messages', icon: 'star-outline', route: 'StarredMessages' },
    { label: 'Theme', icon: 'color-palette-outline', route: 'Theme' },
    { label: 'Security', icon: 'shield-checkmark-outline', route: 'Security' },
    { label: 'Settings', icon: 'settings-outline', route: 'Settings' },
    { label: 'About', icon: 'information-circle-outline', route: 'About' },
  ];

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout? All local data will be cleared.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await SecureStorage.clearAll();
              // Navigation will automatically redirect to login screen
              // due to authentication state change
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.primaryBg }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Header */}
        <View className="px-6 pt-16 pb-6" style={{ backgroundColor: theme.colors.secondaryBg }}>
          {/* Profile Picture */}
          <View
            className="w-20 h-20 rounded-full items-center justify-center mb-4"
            style={{
              backgroundColor: theme.colors.accent,
              shadowColor: theme.colors.accent,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Ionicons name="shield-checkmark" size={40} color="#FFFFFF" />
          </View>
          
          <Text className="text-xl font-bold" style={{ color: theme.colors.textPrimary }}>
            Capt. Miller
          </Text>
          <Text className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
            DEF2025001 • Captain
          </Text>
          
          <View className="flex-row mt-3">
            <View
              className="px-3 py-1 rounded-full flex-row items-center"
              style={{ backgroundColor: isDark ? theme.colors.cardBg : theme.colors.secondaryBg }}
            >
              <View className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: theme.colors.success }} />
              <Text className="text-xs font-semibold" style={{ color: theme.colors.success }}>
                Online
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-2 py-4">
          {drawerItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center py-4 px-4 rounded-lg mb-1"
              style={{
                backgroundColor: 'transparent',
              }}
              onPress={() => props.navigation.navigate(item.route)}
            >
              <Ionicons name={item.icon} size={24} color={theme.colors.textPrimary} />
              <Text className="flex-1 text-base font-medium ml-4" style={{ color: theme.colors.textPrimary }}>
                {item.label}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Divider */}
        <View className="h-px mx-4 my-2" style={{ backgroundColor: theme.colors.border }} />

        {/* Logout */}
        <TouchableOpacity
          className="flex-row items-center py-4 px-6 mx-2 rounded-lg"
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color={theme.colors.error} />
          <Text className="text-base font-medium ml-4" style={{ color: theme.colors.error }}>
            Logout
          </Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      {/* Footer */}
      <View className="border-t px-6 py-4" style={{ borderTopColor: theme.colors.border }}>
        <View className="flex-row items-center justify-center">
          <Ionicons name="shield-checkmark" size={16} color={theme.colors.accent} />
          <Text className="text-xs ml-2" style={{ color: theme.colors.textSecondary }}>
            Secure Communication Platform
          </Text>
        </View>
        <Text className="text-xs text-center mt-1" style={{ color: theme.colors.textSecondary }}>
          Version 1.0.0 • Encrypted
        </Text>
      </View>
    </View>
  );
};
