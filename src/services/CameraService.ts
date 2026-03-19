import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export interface CapturedImage {
  uri: string;
  width: number;
  height: number;
  type?: string;
}

class CameraService {
  /**
   * Request camera permissions
   */
  static async requestCameraPermissions() {
    try {
      const result = await ImagePicker.requestCameraPermissionsAsync();

      if (result.status !== 'granted') {
        if (!result.canAskAgain) {
          Alert.alert(
            'Camera Permission Denied',
            'Camera permission has been permanently denied. Please enable it in your device settings.',
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert(
            'Camera Permission Required',
            'This app needs camera access to take photos.',
            [{ text: 'OK' }]
          );
        }
      }

      return result;
    } catch (error) {
      console.error('Error requesting camera permissions:', error);
      throw new Error('Failed to request camera permissions');
    }
  }

  /**
   * Check if camera permissions are granted
   */
  static async checkCameraPermissions(): Promise<boolean> {
    try {
      const result = await ImagePicker.getCameraPermissionsAsync();
      return result.status === 'granted';
    } catch (error) {
      console.error('Error checking camera permissions:', error);
      return false;
    }
  }

  /**
   * Open camera and capture image
   */
  static async captureImage(): Promise<CapturedImage | null> {
    try {
      const hasPermission = await this.checkCameraPermissions();
      if (!hasPermission) {
        const permissionStatus = await this.requestCameraPermissions();
        if (permissionStatus.status !== 'granted') {
          return null;
        }
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.cancelled) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
      };
    } catch (error) {
      console.error('Error capturing image:', error);
      Alert.alert('Camera Error', 'Failed to capture image. Please try again.');
      return null;
    }
  }

  /**
   * Open camera with custom options
   */
  static async captureImageWithOptions(options: {
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
  }): Promise<CapturedImage | null> {
    try {
      const hasPermission = await this.checkCameraPermissions();
      if (!hasPermission) {
        const permissionStatus = await this.requestCameraPermissions();
        if (permissionStatus.status !== 'granted') {
          return null;
        }
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: options.allowsEditing ?? true,
        aspect: options.aspect ?? [4, 3],
        quality: options.quality ?? 1,
      });

      if (result.cancelled) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
      };
    } catch (error) {
      console.error('Error capturing image with options:', error);
      Alert.alert('Camera Error', 'Failed to capture image. Please try again.');
      return null;
    }
  }

  /**
   * Open image picker from gallery
   */
  static async pickImageFromGallery(): Promise<CapturedImage | null> {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (result.cancelled) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
      };
    } catch (error) {
      console.error('Error picking image from gallery:', error);
      Alert.alert('Gallery Error', 'Failed to pick image. Please try again.');
      return null;
    }
  }
}

export default CameraService;
