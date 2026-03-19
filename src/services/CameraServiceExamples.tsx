import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CameraService from '../services/CameraService';
import { useCamera } from '../hooks/useCamera';

/**
 * CAMERA SERVICE USAGE EXAMPLES
 * 
 * This file demonstrates different ways to use the CameraService
 * and useCamera hook in your application.
 */

/**
 * Example 1: Using CameraService directly
 */
export async function Example1_DirectCameraService() {
  // Check if camera permissions are granted
  const hasPermission = await CameraService.checkCameraPermissions();

  if (!hasPermission) {
    // Request permissions
    const permissionStatus = await CameraService.requestCameraPermissions();
    
    if (permissionStatus.status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required');
      return;
    }
  }

  // Capture image
  const image = await CameraService.captureImage();
  
  if (image) {
    console.log('Image captured:', image.uri);
    // Use image.uri to display or save the image
  }
}

/**
 * Example 2: Using CameraService with custom options
 */
export async function Example2_CustomOptions() {
  const image = await CameraService.captureImageWithOptions({
    allowsEditing: true,
    aspect: [16, 9],
    quality: 0.8,
  });

  if (image) {
    console.log('Image dimensions:', image.width, 'x', image.height);
  }
}

/**
 * Example 3: Using useCamera hook (Recommended for React components)
 */
export function Example3_UseCamera() {
  const { image, loading, takePicture, clearImage } = useCamera({
    onSuccess: (capturedImage) => {
      console.log('Image successfully captured:', capturedImage.uri);
    },
    onError: (error) => {
      console.error('Failed to capture image:', error.message);
    },
  });

  return (
    <View>
      <TouchableOpacity onPress={takePicture} disabled={loading}>
        <Text>{loading ? 'Capturing...' : 'Take Picture'}</Text>
      </TouchableOpacity>

      {image && (
        <>
          <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
          <TouchableOpacity onPress={clearImage}>
            <Text>Clear</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

/**
 * Example 4: Using useCamera with gallery picker
 */
export function Example4_GalleryPicker() {
  const { image, loading, pickFromGallery, clearImage, imageUri } = useCamera();

  return (
    <View>
      <TouchableOpacity onPress={pickFromGallery} disabled={loading}>
        <Text>{loading ? 'Loading...' : 'Pick from Gallery'}</Text>
      </TouchableOpacity>

      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
          <Text>Width: {image?.width}, Height: {image?.height}</Text>
        </>
      )}
    </View>
  );
}

/**
 * Example 5: Using useCamera with custom camera options
 */
export function Example5_CustomCameraOptions() {
  const { image, loading, takePictureWithOptions, error } = useCamera();

  const handleTakePicture = async () => {
    await takePictureWithOptions({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={handleTakePicture} disabled={loading}>
        <Text>{loading ? 'Please wait...' : 'Capture High Quality Photo'}</Text>
      </TouchableOpacity>

      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}

      {image && (
        <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />
      )}
    </View>
  );
}

/**
 * AVAILABLE METHODS:
 * 
 * CameraService Methods:
 * - requestCameraPermissions()           // Request camera access
 * - checkCameraPermissions()             // Check if permissions are granted
 * - captureImage()                       // Open camera with default settings
 * - captureImageWithOptions(options)     // Open camera with custom settings
 * - pickImageFromGallery()               // Open gallery picker
 * 
 * useCamera Hook Returns:
 * - image                                // CapturedImage object
 * - imageUri                             // String URI of captured image
 * - loading                              // Boolean indicating operation status
 * - error                                // Error object if operation failed
 * - takePicture()                        // Capture image with default settings
 * - takePictureWithOptions(options)      // Capture with custom options
 * - pickFromGallery()                    // Pick image from gallery
 * - clearImage()                         // Clear current image
 */

/**
 * INTERFACES:
 * 
 * CapturedImage {
 *   uri: string;           // Image file URI
 *   width: number;         // Image width in pixels
 *   height: number;        // Image height in pixels
 *   type?: string;         // Image type/format
 * }
 * 
 * CameraOptions {
 *   allowsEditing?: boolean;     // Allow user to edit image (default: true)
 *   aspect?: [number, number];   // Aspect ratio (default: [4, 3])
 *   quality?: number;            // Image quality 0-1 (default: 1)
 * }
 */

export default function CameraExamplesDocumentation() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Camera Service & useCamera Hook Examples
      </Text>
      
      <Text style={{ marginBottom: 20, color: '#666' }}>
        See the code above for 5 different examples of how to use the camera functionality.
        Choose the approach that best fits your use case.
      </Text>

      <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5 }}>
        Recommended Approach:
      </Text>
      <Text style={{ marginBottom: 20, color: '#333' }}>
        Use the useCamera hook in React components for easy state management and error handling.
      </Text>

      <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5 }}>
        For Direct Usage:
      </Text>
      <Text style={{ color: '#333' }}>
        Use CameraService static methods for one-off operations or in non-component contexts.
      </Text>
    </ScrollView>
  );
}
