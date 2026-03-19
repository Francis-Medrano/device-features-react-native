import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { photoCaptureScreenStyles as styles } from '../styles/PhotoCaptureScreenStyle';
import { COLORS } from '../styles/globalStyles';
import { DIMENSIONS } from '../styles/dimensions';
import CameraService, { CapturedImage } from '../services/CameraService';
import LocationService, { LocationAddress } from '../services/locationService';

type Props = NativeStackScreenProps<RootStackParamList, 'PhotoCapture'>;

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export default function PhotoCaptureScreen({ navigation }: Props) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [address, setAddress] = useState<LocationAddress | null>(null);
  const [locationCoords, setLocationCoords] = useState<LocationCoords | null>(null);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [loadingCamera, setLoadingCamera] = useState(false);

  // Request permissions on component mount
  useEffect(() => {
    requestPermissions();
  }, []);

  // Fetch address when photo is taken
  useEffect(() => {
    if (photoUri) {
      fetchCurrentLocation();
    }
  }, [photoUri]);

  const requestPermissions = async () => {
    try {
      await CameraService.requestCameraPermissions();
      await LocationService.requestLocationPermissions();
    } catch (error) {
      console.error('Permission request error:', error);
    }
  };

  const takePicture = async () => {
    try {
      setLoadingCamera(true);
      const image = await CameraService.captureImage();

      if (image) {
        setPhotoUri(image.uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    } finally {
      setLoadingCamera(false);
    }
  };

  const fetchCurrentLocation = async () => {
    try {
      setLoadingAddress(true);

      // Get current location with address
      const currentLocation = await LocationService.getCurrentLocationWithAddress();

      if (currentLocation) {
        setLocationCoords({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        });

        if (currentLocation.address) {
          setAddress(currentLocation.address);
        }
      }
    } catch (error) {
      console.error('Location error:', error);
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleRemovePicture = () => {
    setPhotoUri(null);
    setAddress(null);
    setLocationCoords(null);
  };

  const handleSave = () => {
    if (!photoUri) {
      Alert.alert('Required', 'Please take a picture first');
      return;
    }

    Alert.alert('Success', 'Photo saved successfully!', [
      {
        text: 'OK',
        onPress: () => {
          handleRemovePicture();
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📸 Capture Photo</Text>
      </View>

      {/* Photo Section */}
      <View style={styles.photoSection}>
        <View style={styles.photoContainer}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
          ) : (
            <Text style={styles.photoPlaceholder}>No photo taken yet</Text>
          )}
        </View>

        <TouchableOpacity 
          style={styles.takePictureButton} 
          onPress={takePicture}
          disabled={loadingCamera}
        >
          {loadingCamera ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.takePictureButtonText}>📷 Take Picture</Text>
          )}
        </TouchableOpacity>

        {photoUri && (
          <TouchableOpacity style={styles.removePictureButton} onPress={handleRemovePicture}>
            <Text style={styles.removePictureButtonText}>Remove Picture</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Address Section */}
      {photoUri && (
        <View style={styles.addressSection}>
          <Text style={styles.sectionLabel}>📍 Location</Text>
          <View style={styles.addressContainer}>
            {loadingAddress ? (
              <View style={{ alignItems: 'center' }}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={{ color: COLORS.textLight, marginTop: DIMENSIONS.spacing.md }}>
                  Fetching location...
                </Text>
              </View>
            ) : address ? (
              <>
                <Text style={styles.addressText}>
                  {LocationService.formatAddress(address, 'multiline')}
                </Text>
                {locationCoords && (
                  <Text style={[styles.addressText, { marginTop: DIMENSIONS.spacing.md, color: COLORS.textLight, fontSize: DIMENSIONS.fontSize.xs }]}>
                    📌 {locationCoords.latitude.toFixed(6)}, {locationCoords.longitude.toFixed(6)}
                  </Text>
                )}
              </>
            ) : (
              <Text style={styles.addressText}>No address available</Text>
            )}
          </View>
        </View>
      )}

      {/* Action Buttons */}
      {photoUri && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, !photoUri && styles.disabledButton]}
            onPress={handleSave}
            disabled={!photoUri}
          >
            <Text style={styles.saveButtonText}>💾 Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
