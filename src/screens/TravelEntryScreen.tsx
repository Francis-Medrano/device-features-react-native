import React, { useState, useEffect } from 'react';
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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { travelEntryScreenStyles as styles } from '../styles/TravelEntryScreenStyle';
import { COLORS } from '../styles/globalStyles';
import { DIMENSIONS } from '../styles/dimensions';
import CameraService, { CapturedImage } from '../services/CameraService';
import LocationService, { LocationAddress } from '../services/locationService';
import { useEntries } from '../contexts/EntriesContext';
import { Entry } from '../types/Entry';

type Props = NativeStackScreenProps<RootStackParamList, 'TravelEntry'>;

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export default function TravelEntryScreen({ navigation }: Props) {
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

  const pickFromGallery = async () => {
    try {
      setLoadingCamera(true);
      const image = await CameraService.pickImageFromGallery();

      if (image) {
        setPhotoUri(image.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
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
      Alert.alert('Required', 'Please take or select a picture first');
      return;
    }
    setShowTitleModal(true);
  };

  const handleSaveEntry = async () => {
    if (!title.trim()) {
      Alert.alert('Required', 'Please enter a location name/title');
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
      Alert.alert('Success', 'Travel location saved successfully!', [
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
      Alert.alert('Error', 'Failed to save travel entry. Please try again.');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>✈️ Travel Entry</Text>
      </View>

      {/* Photo Section */}
      <View style={styles.photoSection}>
        <View style={styles.photoContainer}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
          ) : (
            <Text style={styles.photoPlaceholder}>No photo selected yet</Text>
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

        <Pressable 
          style={styles.galleryButton} 
          onPress={pickFromGallery}
          disabled={loadingCamera}
        >
          {loadingCamera ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.takePictureButtonText}>🖼️ Pick from Gallery</Text>
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
          <Text style={styles.sectionLabel}>📍 Location</Text>
          <View style={styles.addressContainer}>
            {loadingAddress ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={styles.loadingIndicatorText}>
                  Fetching location...
                </Text>
              </View>
            ) : address ? (
              <>
                <Text style={styles.addressText}>
                  {LocationService.formatAddress(address, 'multiline')}
                </Text>
                {locationCoords && (
                  <Text style={styles.coordinatesText}>
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
          <Pressable
            style={[styles.saveButton, !photoUri && styles.disabledButton]}
            onPress={handleSave}
            disabled={!photoUri}
          >
            <Text style={styles.saveButtonText}>💾 Save Travel Entry</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Travel Journal • Travel Entry</Text>
      </View>

      {/* Title & Description Modal */}
      <Modal
        visible={showTitleModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Save Travel Location
            </Text>

            <Text style={styles.modalLabel}>
              Location Name
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g., Eiffel Tower, Times Square..."
              placeholderTextColor={COLORS.textSecondary}
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.modalLabel}>
              Notes (optional)
            </Text>
            <TextInput
              style={styles.modalInputMultiline}
              placeholder="Add travel notes, memories, tips..."
              placeholderTextColor={COLORS.textSecondary}
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
