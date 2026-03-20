import React from 'react';
import {
  View,
  Text,
  Pressable,
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
      <Pressable onPress={takePicture} disabled={loading}>
        <Text>{loading ? 'Capturing...' : 'Take Picture'}</Text>
      </Pressable>

      {image && (
        <>
          <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
          <Pressable onPress={clearImage}>
            <Text>Clear</Text>
          </Pressable>
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
      <Pressable onPress={pickFromGallery} disabled={loading}>
        <Text>{loading ? 'Loading...' : 'Pick from Gallery'}</Text>
      </Pressable>

      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
          <Text>Width: {image?.width}, Height: {image?.height}</Text>
        </>
      )}
    </View>
  );
}

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
      <Pressable onPress={handleTakePicture} disabled={loading}>
        <Text>{loading ? 'Please wait...' : 'Capture High Quality Photo'}</Text>
      </Pressable>

      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}

      {image && (
        <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />
      )}
    </View>
  );
}

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
