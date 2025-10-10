import { useEffect } from 'react';
import { Platform, AppState } from 'react-native';
import ScreenshotPrevent from 'react-native-screenshot-prevent';

// Enable screenshot protection globally
export const enableScreenshotProtection = () => {
  if (Platform.OS === 'android') {
    ScreenshotPrevent.enabled(true);
  }
  // For iOS, it's handled at native level
};

// Disable screenshot protection
export const disableScreenshotProtection = () => {
  if (Platform.OS === 'android') {
    ScreenshotPrevent.enabled(false);
  }
};

// Hook to use screenshot protection
export const useScreenshotProtection = (enabled: boolean = true) => {
  useEffect(() => {
    if (enabled) {
      enableScreenshotProtection();
    }

    return () => {
      if (enabled) {
        // Keep protection on even when component unmounts
      }
    };
  }, [enabled]);
};

// Disable copy/paste for text inputs
export const disableCopyPaste = () => ({
  contextMenuHidden: true,
  selectTextOnFocus: false,
  selectable: false,
});

// Blur app in background (for recent apps screen)
export const useAppBackgroundBlur = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        // Blur logic is handled at native level
        enableScreenshotProtection();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
};
