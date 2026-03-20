import { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface UsePreventGoBackOptions {
  enabled?: boolean;
  onBackPress?: () => boolean | void;
  showConfirmDialog?: boolean;
  dialogTitle?: string;
  dialogMessage?: string;
}

/**
 * Custom hook to prevent back navigation on Android
 * Intercepts the hardware back button and optionally shows confirmation dialog
 * 
 * @param options - Configuration options
 * @param options.enabled - Whether the back button prevention is enabled (default: true)
 * @param options.onBackPress - Custom callback when back button is pressed
 * @param options.showConfirmDialog - Show confirmation dialog before allowing back (default: false)
 * @param options.dialogTitle - Title for confirmation dialog (default: "Go Back?")
 * @param options.dialogMessage - Message for confirmation dialog (default: "Are you sure?")
 * 
 * @example
 * // Prevent back navigation
 * usePreventGoBack();
 * 
 * @example
 * // Prevent back with confirmation dialog
 * usePreventGoBack({
 *   showConfirmDialog: true,
 *   dialogTitle: "Discard Changes?",
 *   dialogMessage: "You have unsaved changes. Do you want to discard them?"
 * });
 * 
 * @example
 * // Prevent back with custom handler
 * usePreventGoBack({
 *   onBackPress: () => {
 *     console.log('Back button pressed');
 *     return true; // prevent default behavior
 *   }
 * });
 */
export function usePreventGoBack({
  enabled = true,
  onBackPress,
  showConfirmDialog = false,
  dialogTitle = 'Go Back?',
  dialogMessage = 'Are you sure?',
}: UsePreventGoBackOptions = {}): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleBackPress = () => {
      // Call custom handler if provided
      if (onBackPress) {
        const result = onBackPress();
        // If handler returns true, prevent default behavior
        return result === true;
      }

      // Show confirmation dialog if enabled
      if (showConfirmDialog) {
        Alert.alert(dialogTitle, dialogMessage, [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Go Back',
            onPress: () => BackHandler.exitApp(),
            style: 'destructive',
          },
        ]);
        return true; // Prevent default back behavior
      }

      // Default: prevent back navigation
      return true;
    };

    // Subscribe to back button events
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    // Cleanup subscription on unmount
    return () => backHandler.remove();
  }, [enabled, onBackPress, showConfirmDialog, dialogTitle, dialogMessage]);
}
