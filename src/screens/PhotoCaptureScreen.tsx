import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { photoCaptureScreenStyles as styles } from '../styles/PhotoCaptureScreenStyle';
import { getThemeAwareStyles } from '../styles/themeAwareStyles';
import { COLORS } from '../styles/globalStyles';
import { DIMENSIONS } from '../styles/dimensions';
import CameraService, { CapturedImage } from '../services/CameraService';
import LocationService, { LocationAddress } from '../services/locationService';
import { useEntries } from '../contexts/EntriesContext';
import { useTheme } from '../contexts/ThemeContext';
import { Entry } from '../types/Entry';
import { usePreventGoBack } from '../hooks/usePreventGoBack';

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
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const { addEntry } = useEntries();
  const { theme, toggleTheme } = useTheme();
  const themeAwareStyles = useMemo(() => getThemeAwareStyles(theme), [theme]);
  usePreventGoBack();

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
    setShowTitleModal(true);
  };

  const handleSaveEntry = async () => {
    if (!title.trim()) {
      Alert.alert('Required', 'Please enter a title');
      return;
    }

    if (!photoUri) {
      Alert.alert('Error', 'Photo not found');
      return;
    }

    try {
      setSaving(true);
      const entry: Entry = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        imageUri: photoUri,
        address: address || null,
        createdAt: new Date().toISOString(),
      };

      await addEntry(entry);
      Alert.alert('Success', 'Photo saved successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setShowTitleModal(false);
            setTitle('');
            setDescription('');
            handleRemovePicture();
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save photo. Please try again.');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={[styles.container, themeAwareStyles.container]} contentContainerStyle={styles.scrollContent}>
      {/* Photo Section */}}
      <View style={styles.photoSection}>
        <View style={[styles.photoContainer, themeAwareStyles.card]}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
          ) : (
            <Text style={[styles.photoPlaceholder, themeAwareStyles.textMuted]}>No photo taken yet</Text>
          )}
        </View>

        <Pressable 
          style={styles.takePictureButton} 
          onPress={takePicture}
          disabled={loadingCamera}
        >
          {loadingCamera ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.takePictureButtonText}>📷 Take Picture</Text>
          )}
        </Pressable>

        {photoUri && (
          <Pressable style={styles.removePictureButton} onPress={handleRemovePicture}>
            <Text style={styles.removePictureButtonText}>Remove Picture</Text>
          </Pressable>
        )}
      </View>

      {/* Address Section */}
      {photoUri && (
        <View style={styles.addressSection}>
          <Text style={[styles.sectionLabel, themeAwareStyles.title]}>📍 Location</Text>
          <View style={[styles.addressContainer, themeAwareStyles.card]}>
            {loadingAddress ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={[styles.loadingIndicatorText, themeAwareStyles.textMuted]}>
                  Fetching location...
                </Text>
              </View>
            ) : address ? (
              <>
                <Text style={[styles.addressText, themeAwareStyles.text]}>
                  {LocationService.formatAddress(address, 'multiline')}
                </Text>
                {locationCoords && (
                  <Text style={[styles.coordinatesText, themeAwareStyles.textLight]}>
                    📌 {locationCoords.latitude.toFixed(6)}, {locationCoords.longitude.toFixed(6)}
                  </Text>
                )}
              </>
            ) : (
              <Text style={[styles.addressText, themeAwareStyles.textMuted]}>No address available</Text>
            )}
          </View>
        </View>
      )}

      {/* Action Buttons */}
      {photoUri && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.saveButton, !photoUri && styles.disabledButton]}
            onPress={handleSave}
            disabled={!photoUri}
          >
            <Text style={styles.saveButtonText}>💾 Save</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={[styles.footerText, themeAwareStyles.textMuted]}>Travel Journal • Photo Capture</Text>
      </View>

      {/* Title & Description Modal */}
      <Modal
        visible={showTitleModal}
        transparent={true}
        animationType="slide"
      >
        <View style={[styles.modalOverlay, { backgroundColor: themeAwareStyles.container.backgroundColor }]}>
          <View style={[styles.modalContent, themeAwareStyles.card]}>
            <Text style={[styles.modalTitle, themeAwareStyles.title]}>
              Save Photo
            </Text>

            <Text style={[styles.modalLabel, themeAwareStyles.title]}>
              Title
            </Text>
            <TextInput
              style={[styles.modalInput, themeAwareStyles.card, { color: themeAwareStyles.text.color }]}
              placeholder="Enter title..."
              placeholderTextColor={themeAwareStyles.placeholder.color}
              value={title}
              onChangeText={setTitle}
            />

            <Text style={[styles.modalLabel, themeAwareStyles.title]}>
              Description (optional)
            </Text>
            <TextInput
              style={[styles.modalInputMultiline, themeAwareStyles.card, { color: themeAwareStyles.text.color }]}
              placeholder="Enter description..."
              placeholderTextColor={themeAwareStyles.placeholder.color}
              value={description}
              onChangeText={setDescription}
              multiline={true}
            />

            <View style={styles.modalButtonRow}>
              <Pressable
                style={[styles.modalButton, styles.modalSaveButton]}
                onPress={handleSaveEntry}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  <Text style={styles.modalSaveButtonText}>
                    Save
                  </Text>
                )}
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => {
                  setShowTitleModal(false);
                  setTitle('');
                  setDescription('');
                }}
                disabled={saving}
              >
                <Text style={styles.modalCancelButtonText}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
