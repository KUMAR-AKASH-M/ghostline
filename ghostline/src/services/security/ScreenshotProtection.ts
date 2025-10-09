import { useEffect } from 'react';
import { Platform } from 'react-native';
import ScreenshotPrevent from 'rn-screenshot-prevent';

export const useScreenshotProtection = (enabled: boolean = true) => {
  useEffect(() => {
    if (enabled) {
      if (Platform.OS === 'android') {
        ScreenshotPrevent.enabled(true);
      } else if (Platform.OS === 'ios') {
        // iOS: Enable screenshot prevention
        ScreenshotPrevent.enableSecureView();
      }
    }

    return () => {
      if (Platform.OS === 'android') {
        ScreenshotPrevent.enabled(false);
      } else if (Platform.OS === 'ios') {
        ScreenshotPrevent.disableSecureView();
      }
    };
  }, [enabled]);
};

export const disableCopyPaste = () => {
  // Additional implementation for disabling copy-paste in TextInput
  return {
    contextMenuHidden: true,
    onLongPress: () => false,
  };
};
