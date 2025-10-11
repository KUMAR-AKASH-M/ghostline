import { useEffect } from 'react';
import { AppState } from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';

// Enable screenshot protection globally
export const enableScreenshotProtection = async () => {
  await ScreenCapture.preventScreenCaptureAsync();
};

// Disable screenshot protection
export const disableScreenshotProtection = async () => {
  await ScreenCapture.allowScreenCaptureAsync();
};

// Hook to use screenshot protection
export const useScreenshotProtection = (enabled: boolean = true) => {
  useEffect(() => {
    if (enabled) {
      enableScreenshotProtection();
    } else {
      disableScreenshotProtection();
    }

    return () => {
      if (enabled) {
        disableScreenshotProtection();
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
        enableScreenshotProtection();
      } else if (nextAppState === 'active') {
        disableScreenshotProtection();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
};
