import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useScreenshotProtection } from '../services/security/ScreenshotProtection';

interface FileViewerScreenProps {
  fileType: 'pdf' | 'image' | 'video';
  fileName: string;
  onClose: () => void;
}

export const FileViewerScreen: React.FC<FileViewerScreenProps> = ({
  fileType,
  fileName,
  onClose,
}) => {
  useScreenshotProtection(true);

  return (
    <View className="flex-1 bg-military-dark">
      {/* Header */}
      <View className="bg-military-navy px-4 pt-12 pb-4 flex-row items-center">
        <TouchableOpacity onPress={onClose} className="mr-4">
          <Text className="text-white text-2xl">×</Text>
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-white font-semibold">{fileName}</Text>
          <Text className="text-military-grey text-sm">
            {fileType.toUpperCase()} • Protected
          </Text>
        </View>
      </View>

      {/* File Content with Watermark */}
      <ScrollView className="flex-1 relative">
        <View className="p-6 items-center justify-center min-h-full">
          <Text className="text-military-lightGrey text-center">
            {fileType === 'pdf' && '📄 PDF Document Viewer'}
            {fileType === 'image' && '🖼️ Image Viewer'}
            {fileType === 'video' && '🎥 Video Player'}
          </Text>
          <Text className="text-military-grey text-sm mt-4 text-center">
            File content displayed here
          </Text>
        </View>

        {/* Diagonal Watermark */}
        <View className="absolute inset-0 items-center justify-center pointer-events-none">
          <View style={{ transform: [{ rotate: '-45deg' }] }}>
            <Text className="text-military-grey opacity-10 text-4xl font-bold">
              CONFIDENTIAL
            </Text>
            <Text className="text-military-grey opacity-10 text-sm text-center mt-2">
              officer001 • {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Security Notice */}
      <View className="bg-military-navy px-4 py-3">
        <Text className="text-military-grey text-xs text-center">
          🔒 Screenshots disabled • Content watermarked for security
        </Text>
      </View>
    </View>
  );
};
